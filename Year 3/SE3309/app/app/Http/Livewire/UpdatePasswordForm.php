<?php

namespace App\Http\Livewire;

use Livewire\Component;

class UpdatePasswordForm extends Component
{
    public $user;
    public $password;
    public $new_password;
    public $password_confirmation;

    protected $rules = [
        'password'              => 'bail|required',
        'new_password'          => 'bail|min:8|required',
        'password_confirmation' => 'bail|required|same:new_password',
    ];


    public function render()
    {
        return view('livewire.update-password-form');
    }

    public function save()
    {
        $this->validate();

        if (!$this->passwordMatchesCurrent($this->password)) {
            flash()->error('Your current password is incorrect.');
            return;
        }

        // if new password also matches current

        if ($this->passwordMatchesCurrent($this->new_password)) {
            flash()->error('Please enter a different password than your current one.');
            return;
        }

        $this->user->password = bcrypt($this->new_password);
        $this->user->save();

        flash('Password updated!');
    }

    /**
     * Check if the new password matches the current password
     *
     * @param $password
     * @return bool
     */
    public function passwordMatchesCurrent($password)
    {
        // Current password is right
        if (\Hash::check($password, auth()->user()->password)) {
            return true;
        }

        return false;

    }
}
