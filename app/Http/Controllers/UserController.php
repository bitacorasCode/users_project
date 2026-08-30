<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function address(User $user)
    {
        return response()->json(
            $user->address
        );
    }

    public function notes(User $user)
    {
        return response()->json(
            $user->notes()->get()
        );
    }

    public function store(StoreUserRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $data = $request->validated();

            $user = User::create([
                'name' => $data['name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'rut' => $data['rut'],
                'phone' => $data['phone'] ?? null,
                'role_id' => $data['role_id'],
                'state' => $data['state'],
            ]);

            $user->address()->create([
                'street' => $data['address']['street'],
                'city' => $data['address']['city'],
                'zip_code' => $data['address']['zip_code'] ?? null,
            ]);

            $user->notes()->createMany(
                collect($data['notes'])
                    ->map(fn($note) => [
                        'note' => $note['note'],
                    ])
                    ->toArray()
            );

            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario creado correctamente.');
        });
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'Usuario eliminado correctamente.');
    }
}
