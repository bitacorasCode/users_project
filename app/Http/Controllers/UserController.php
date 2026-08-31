<?php

namespace App\Http\Controllers;

use App\Enums\UserState;
use App\Http\Requests\StoreUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('role');

        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function ($query) use ($search) {
                $query->where('name', 'ILIKE', "%{$search}%")
                    ->orWhere('last_name', 'ILIKE', "%{$search}%")
                    ->orWhere('email', 'ILIKE', "%{$search}%")
                    ->orWhere('rut', 'ILIKE', "%{$search}%")
                    ->orWhere('phone', 'ILIKE', "%{$search}%");
            });
        }

        if ($request->filled('role_id')) {
            $query->where('role_id', $request->input('role_id'));
        }

        if ($request->filled('state')) {
            $query->where('state', $request->input('state'));
        }

        $users = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'rut' => $user->rut,
                'phone' => $user->phone,

                'state' => [
                    'value' => $user->state->value,
                    'label' => $user->state->label(),
                ],

                'role' => [
                    'id' => $user->role->id,
                    'name' => $user->role->name,
                ],

                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function roles()
    {
        return response()->json(
            Role::select('id', 'name')
                ->orderBy('name')
                ->get()
        );
    }

    public function states()
    {
        return response()->json(
            UserState::options()
        );
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

    public function create()
    {
        return Inertia::render('Users/Create');
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
