<?php

namespace App\Http\Livewire;

use App\User;
use App\Models\Goal;
use Livewire\Component;

class PickGoalForm extends Component
{
    public $goals;
    public function render()
    {
        $this->goals = Goal::pluck('name');
        return view('livewire.pick-goal-form');
    }

    public function selectGoal($name)
    {
        $user = auth()->user();
        $user->goal_name = $name;
        $user->save();

    }
    public function unselectGoal()
    {
        $user = auth()->user();
        $user->goal_name = null;
        $user->save();
    }


}
