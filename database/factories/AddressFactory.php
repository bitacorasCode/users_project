<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Address>
 */
class AddressFactory extends Factory
{
    protected $model = Address::class;

    public function definition(): array
    {
        return [
            'street' => fake()->streetAddress(),
            'city' => fake()->city(),
            'zip_code' => fake()->postcode(),
        ];
    }
}
