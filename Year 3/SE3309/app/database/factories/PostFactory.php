<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Models\Goal;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(\App\Models\Post::class, function(Faker $faker) {
    return [
        'user_id' => factory(User::class),
        'content' => $this->faker->paragraph,
    ];
});
