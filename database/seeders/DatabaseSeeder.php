<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'YAHYA',
            'last_name' => 'AKLI',
            'username' => 'akliyahya',
            'telephone' => '0657838772',
            'email' => 'akli.yahya05@gmail.com',
            'is_admin' => true,
            'blocked_at' => null,
            'password' => 'akliakli',
        ]);

        User::factory(10)->create();
    }
}
