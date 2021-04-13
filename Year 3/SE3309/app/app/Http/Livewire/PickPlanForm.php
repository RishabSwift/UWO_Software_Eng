<?php

namespace App\Http\Livewire;

use App\Models\Plan;
use Livewire\Component;

class PickPlanForm extends Component
{

    protected $listeners = ['openPlanModal' => 'render'];

    public $plans;
    public function render()
    {


        $this->plans = Plan::whereGoalName(auth()->user()->goal_name)
            ->with('exercisePlans')->with('dietPlans.diet')->get();


        return view('livewire.pick-plan-form');
    }

    public function selectPlan($plan_name)
    {
        $user = auth()->user();
        $user->plan_name = $plan_name;
        $user->save();
    }

    public function unselectPlan()
    {
        $user = auth()->user();
        $user->plan_name = null;
        $user->save();
    }
}
