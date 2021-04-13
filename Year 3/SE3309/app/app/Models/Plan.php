<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{


    public $incrementing = false;
    public $timestamps = false;

    public function goal()
    {
        return $this->belongsTo(Goal::class, 'goal_name', 'name');
    }

    public function exercisePlans()
    {
        return $this->hasMany(ExercisePlan::class, 'plan_name', 'name');
    }

    public function dietPlans()
    {
        return $this->hasMany(DailyDietPlan::class, 'plan_name', 'name');
    }


}
