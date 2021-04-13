<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StretchLog extends Model
{
    protected $guarded = [];
    public $timestamps = null;


    public function data()
    {
        return [
            'Tightness Scale' => $this->tightness_scale . '/10',
            'Mobility Scale' => $this->mobility_scale . '/10',
        ];
    }
}
