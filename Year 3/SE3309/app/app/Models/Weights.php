<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weights extends Model
{

    public $timestamps = false;

    public function exercise()
    {
        return $this->belongsTo(Exercise::class, 'exercise_name', 'name');
    }
}
