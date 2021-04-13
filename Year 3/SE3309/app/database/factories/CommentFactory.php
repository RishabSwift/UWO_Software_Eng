<?php



/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Models\Goal;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(\App\Models\Comment::class, function(Faker $faker) {
        return [
            'post_id'   => \App\Models\Post::factory(),
            'user_id' => factory(User::class),
            'content' => $this->faker->paragraph,
        ];
    });
