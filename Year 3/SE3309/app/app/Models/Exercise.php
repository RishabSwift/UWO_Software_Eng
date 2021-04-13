<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{

    // Icon pack source: https://www.flaticon.com/packs/fitness-65?word=exercise&k=1607304498384

    public $timestamps = false;

    public function exercisePlan()
    {
        return $this->hasMany(ExercisePlan::class, 'exercise_name', 'name');
    }

    public static function getNames()
    {
        return self::pluck('name', 'name');
    }

    public static function icon($name)
    {
        $icons = [
            'Benchpress'     => '002-cardio',
            'Breathing'      => '043-fitness-1',
            'Cycling'        => '039-cycling',
            'Dumbbells'      => '001-dumbbell',
            'Jogging'        => '011-workout',
            'Running'        => '048-sprint',
            'Shoulder Press' => '007-dumbbell',
            'Stretch'        => '020-stretching-3',
            'Yoga'           => '042-yoga',
        ];

        return "/fitness-icons/{$icons[$name]}.png";
    }

}
