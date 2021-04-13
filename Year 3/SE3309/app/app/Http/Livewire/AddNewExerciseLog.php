<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\MoodLog;
use App\Models\Exercise;
use App\Models\CardioLog;
use App\Models\WeightsLog;
use App\Models\StretchLog;
use App\Models\ExerciseLog;

class AddNewExerciseLog extends Component
{
    public $name = "Cycling";
    public $exercise_type = 'weights';
    public $mood_scale;
    public $current_weight;
    public $weights_used;
    public $heart_rate;
    public $time;
    public $distance;
    public $tightness;
    public $mobility;
    
    public $image;

    protected $rules = [

        'name' => 'required|string|max:500',
        //        'exercise_type'      => 'required|string',

        'mood_scale'     => 'nullable|required_if:exercise_type,mood|numeric',
        'current_weight' => 'nullable|required_if:exercise_type,weights|numeric',
        'weights_used'   => 'nullable|required_if:exercise_type,weights|numeric',
        'heart_rate'     => 'nullable|required_if:exercise_type,cardio|numeric',
        'distance'       => 'nullable|required_if:exercise_type,cardio|numeric',
        'time'       => 'nullable|required_if:exercise_type,cardio|numeric',
        'tightness'      => 'nullable|required_if:exercise_type,stretch|numeric',
        'mobility'       => 'nullable|required_if:exercise_type,stretch|numeric',

    ];

    public function render()
    {
        $this->updatedName();
        return view('livewire.add-new-exercise-log');
    }

    public function updatedName()
    {
        $this->image = Exercise::icon($this->name);
    }

    public function log()
    {
        $exercise = new ExerciseLog();
        $this->validate();
        switch ($this->exercise_type) {
            case 'mood':
                $modal = MoodLog::create([
                    'mood_scale' => $this->mood_scale,
                ]);
                $exercise->mood_log_id = $modal->id;
                break;
            case 'weights':
                $modal = WeightsLog::create([
                    'weights_used_for_exercise' => $this->weights_used,
                ]);
                $exercise->weights_log_id = $modal->id;
                $exercise->current_weight = $this->current_weight;
                break;
            case 'cardio':
                $modal = CardioLog::create([
                    'heart_rate' => $this->heart_rate,
                    'distance'   => $this->distance,
                    'time'   => $this->time,
                ]);
                $exercise->cardio_log_id = $modal->id;
                break;
            case 'stretch':
                $modal = StretchLog::create([
                    'tightness_scale' => $this->tightness,
                    'mobility_scale'  => $this->mobility,
                ]);
                $exercise->stretch_log_id = $modal->id;
                break;
        }

        $exercise->exercise_name = $this->name;
        $exercise->user_id = auth()->user()->id;
        $exercise->save();

        $this->reset();
        flash('You have successfully logged your exercise!');

    }
}

