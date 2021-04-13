<?php


use App\User;
use App\Models\Post;
use App\Models\Mood;
use App\Models\Goal;
use App\Models\Cardio;
use App\Models\Comment;
use App\Models\Stretch;
use App\Models\Weights;
use App\Models\Exercise;
use Illuminate\Database\Eloquent\Factory;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{


    //                 Comment::factory()
    //                     ->count(100)
    //                     ->for(Post::factory())
    //                     ->for(User::factory())
    //                    ->create();


    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(Faker $faker)
    {

        $this->call(ExerciseSeeder::class);
        $this->call(GoalsSeeder::class);
        $this->call(PlansSeeder::class);


        // Seed users
        factory(User::class, 100)->create();
        foreach (User::all() as $user) {
            $user->posts()->create([
                'content' => $faker->paragraphs(3, true),
            ]);
        }

        // Seed posts
        foreach (Post::all() as $post) {
            $rand_num = rand(3, 10);
            for ($i = 0; $i < $rand_num; $i++) {
                $post->comments()->create([
                    'user_id' => rand(1, 100),
                    'content' => $faker->sentence,
                ]);
            }
        }

        // Diets
        $food = [
            'Tarte Tatin',
            'Tandoori chicken',
            'Three Fish Pie',
            'Japanese gohan rice',
            'Braised Beef Chilli',
            'Lancashire hotpot',
            'Pad See Ew',
            'Salmon Prawn Risotto',
            'Rogaliki (Polish Croissant Cookies)',
            'Peanut Butter Cookies',
            'Dundee cake',
            'Pilchard puttanesca',
            'Lamb Biryani',
            'Smoked Haddock Kedgeree',
            'French Omelette',
            'Lasagna Sandwiches',
            'Bigos (Hunters Stew)',
            'Timbits',
            'Blackberry Fool',
            'Eccles Cakes',
            'Ful Medames',
            'Wontons',
            'Yaki Udon',
        ];

        $rand = rand(30, 50);
        for ($i = 0; $i < $rand; $i++) {

            shuffle($food);
            $meals = array_slice($food, 0, 3);

            \App\Models\DailyDiet::create([
                'breakfast' => $meals[0],
                'lunch'     => $meals[1],
                'dinner'    => $meals[2],
            ]);
        }

        $total_diets = \App\Models\DailyDiet::count();

        foreach (\App\Models\Plan::all() as $plan) {
            $rand = rand(2, 5);
            for ($i = 0; $i < $rand; $i++) {
                \App\Models\DailyDietPlan::create([
                    'plan_name'     => $plan->name,
                    'daily_diet_id' => rand(1, $total_diets),
                ]);
            }
        }
    }


}
