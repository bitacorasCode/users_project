<?php

namespace Database\Factories;

use App\Enums\UserState;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    protected static ?string $password = null;

    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'rut' => fake()->unique()->numerify('########-#'),
            'phone' => fake()->unique()->numerify('+569########'),
            'role_id' => Role::inRandomOrder()->value('id'),
            'state' => fake()->randomElement(UserState::cases()),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }
}
