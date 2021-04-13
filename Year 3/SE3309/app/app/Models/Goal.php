<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{

    public $timestamps = false;
    protected $primaryKey =  null;
    public $incrementing = false;

    public function exercise()
    {
        return $this->belongsTo(Exercise::class, 'exercise_name', 'name');;
    }
}
