<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExerciseLog extends Model
{

    protected $guarded = [];

    public function moodLog()
    {
        return $this->belongsTo(MoodLog::class);
    }


    public function stretchLog()
    {
        return $this->belongsTo(StretchLog::class);
    }

    public function cardioLog()
    {
        return $this->belongsTo(CardioLog::class);
    }


    public function weightLog()
    {
        return $this->belongsTo(WeightsLog::class, 'weights_log_id');
    }


    /**
     * Get relationship based on the type
     * @return string;
     */
    public function type()
    {
        if ($this->mood_log_id) {
            return 'moodLog';
            //            return $this->belongsTo(MoodLog::class);
        }

        if ($this->stretch_log_id) {
            return 'stretchLog';
            //            return $this->belongsTo(StretchLog::class);
        }

        if ($this->cardio_log_id) {
            return 'cardioLog';
            //            return $this->belongsTo(CardioLog::class);
        }

        if ($this->weights_log_id) {
            return 'weightLog';
            //            return $this->belongsTo(WeightsLog::class);
        }
        return null;
    }
}
