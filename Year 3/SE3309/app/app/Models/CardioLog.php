<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardioLog extends Model
{
    protected $guarded = [];
    public $timestamps = null;

    public function data()
    {
        return [
            'Heart Rate' => $this->heart_rate,
            'Distance (m)' => $this->distance . ' m',
            'Time (minutes)' => $this->time . ' s',
        ];
    }
}
