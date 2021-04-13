<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExercisePlan extends Model
{


    public $timestamps = false;

    public function exercise()
    {
        return $this->hasOne(Exercise::class, 'name', 'exercise_name');
    }

    public function plan()
    {
        return $this->hasOne(Plan::class, 'name', 'plan_name');
    }
}
