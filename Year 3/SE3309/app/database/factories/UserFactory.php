<?php


/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Models\Goal;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


$factory->define(User::class, function (Faker $faker) {
    return [
        'username' => $this->faker->name,
        'email' => $this->faker->unique()->safeEmail,
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        'goal_name' =>  Goal::all()->random(1)->first()->name,
    ];
});

