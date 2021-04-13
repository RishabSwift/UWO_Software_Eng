<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyDietPlan extends Model
{

    public $timestamps = false;
    public $guarded = [];

    public function diet()
    {
        return $this->belongsTo(DailyDiet::class, 'daily_diet_id', 'id');
    }
}
