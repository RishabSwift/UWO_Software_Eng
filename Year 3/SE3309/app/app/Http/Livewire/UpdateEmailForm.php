<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Illuminate\Validation\Rule;

class UpdateEmailForm extends Component
{
    public $user;

    protected $rules = [
        'user.username' => 'required|min:4',
        'user.email' => 'required|email',
    ];

    public function render()
    {
        return view('livewire.update-email-form');
    }

    public function save()
    {
        $this->validate([
            'user.email' => [
                'email',
                'required',
                Rule::unique('users', 'email')->ignore(auth()->user()->id),
            ]
        ]);
        $this->user->save();
        flash('Account details updated!');
        $this->emit('refresh-user');
    }



}
