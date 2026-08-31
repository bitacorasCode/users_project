<?php

namespace Database\Factories;

use App\Enums\UserState;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
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
        ];
    }
}
