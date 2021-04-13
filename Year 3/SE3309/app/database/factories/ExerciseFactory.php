<?php


/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Models\Goal;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


$factory->define(\App\Models\Exercise::class, function (Faker $faker) {
        return [
            'name'        => $this->faker->word,
            'description' => $this->faker->words(5, true),
        ];
    });
