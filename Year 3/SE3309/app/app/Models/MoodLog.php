<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MoodLog extends Model
{

    public $timestamps = null;
    protected $guarded = [];

    public function data()
    {
        return [
            'Mood Scale' => $this->mood_scale . '/10',
        ];
    }
}
