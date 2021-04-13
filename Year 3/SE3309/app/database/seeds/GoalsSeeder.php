<?php



use App\Models\Goal;
use Illuminate\Database\Seeder;

class GoalsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (['Gain Weight', 'Lose Weight', 'Gain Muscle', 'Gain Stamina', 'Improved Mood', 'Improved Flexibility', 'Decrease Tension'] as $goal) {
            Goal::firstOrCreate([
                'name' => $goal
            ]);
        }
    }
}
