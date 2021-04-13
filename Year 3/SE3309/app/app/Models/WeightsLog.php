<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeightsLog extends Model
{
    protected $guarded = [];
    public $timestamps = null;

    public function data()
    {
        return [
            'Weights Used' => $this->weights_used_for_exercise . ' lb',
        ];
    }

}
