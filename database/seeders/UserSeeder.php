<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()
            ->count(15)
            ->has(Address::factory(), 'address')
            ->has(Note::factory()->count(2), 'notes')
            ->create();
    }
}
