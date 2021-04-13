<?php



use App\Models\Mood;
use App\Models\Cardio;
use App\Models\Stretch;
use App\Models\Weights;
use App\Models\Exercise;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $exercises = [
            'Dumbbells'      => 'Heavy lifting baby',
            'Benchpress'     => 'How much can you lift',
            'Breathing'      => 'Breathe',
            'Stretch'        => 'Touch your toes',
            'Running'        => 'Touch the sidewalk',
            'Shoulder Press' => 'Shoulder press',
            'Cycling'        => 'Bike it',
            'Jogging'        => 'Slow running',
            'Yoga'           => 'Stretchhhh',
        ];

        foreach ($exercises as $name => $description) {
            Exercise::firstOrCreate([
                'name'         => $name,
                'description' => $description,
            ]);
        }

        Cardio::create([
            'exercise_name' => 'Running',
            'distance'      => 0.2,
        ]);
        Cardio::create([
            'exercise_name' => 'Cycling',
            'distance'      => 15,
        ]);
        Cardio::create([
            'exercise_name' => 'Jogging',
            'distance'      => 4,
        ]);

        Mood::create([
            'exercise_name' => 'Breathing',
            'todays_goal'   => 1,
        ]);

        Stretch::create([
            'exercise_name' => 'Stretch',
            'duration'      => null,
        ]);

        Stretch::create([
            'exercise_name' => 'Yoga',
            'duration'      => 5,
        ]);

        Weights::create([
            'exercise_name' => 'Benchpress',
            'reps'          => '3',
            'sets'          => '3',
        ]);

        Weights::create([
            'exercise_name' => 'Dumbbells',
            'reps'          => '8',
            'sets'          => '4',
        ]);

        Weights::create([
            'exercise_name' => 'Shoulder Press',
            'reps'          => '3',
            'sets'          => '5',
        ]);
    }
}
