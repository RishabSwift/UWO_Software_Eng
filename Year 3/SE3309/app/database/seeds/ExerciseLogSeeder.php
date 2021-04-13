<?php



use App\User;
use App\Models\Exercise;
use App\Models\ExerciseLog;
use Illuminate\Database\Seeder;

class ExerciseLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (User::all() as $user) {

            $arr = [
                'mood_log_id'    => '',
                'stretch_log_id' => '',
                'weights_log_id' => '',
                'cardio_log_id'  => '',
            ];

            ExerciseLog::create([
                'user_id'       => $user->id,
                'exercise_name' => Exercise::all()->random(1)->first()->name,
            ]);

        }
    }
}
