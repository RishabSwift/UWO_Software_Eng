<?php



use App\Models\Plan;
use App\Models\Exercise;
use App\Models\ExercisePlan;
use Illuminate\Database\Seeder;

class PlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //Decrease Tension
        //Gain Muscle
        //Gain Stamina
        //Gain Weight
        //Improved Flexibility
        //Improved Mood
        //Lose Weight

        $plans = [
            'Plan A'         => 'Decrease Tension',
            'Plan A (Bonus)' => 'Decrease Tension',
            'Plan B'         => 'Gain Muscle',
            'Plan C'         => 'Gain Stamina',
            'Plan D'         => 'Gain Weight',
            'Plan E'         => 'Improved Flexibility',
            'Plan F'         => 'Improved Mood',
            'Plan G'         => 'Lose Weight',
        ];

        foreach ($plans as $plan => $goal) {
            Plan::firstOrCreate([
                'goal_name' => $goal,
                'name'      => $plan,
            ]);
        }


        for ($i = 0; $i < 25; $i++) {
            ExercisePlan::firstOrCreate([
                'plan_name'     => Plan::all()->random(1)->first()->name,
                'exercise_name' => Exercise::all()->random(1)->first()->name,
            ]);
        }
    }
}

