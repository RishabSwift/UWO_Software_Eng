<?php

namespace App\Http\Livewire;

use Livewire\Component;

class AddNewFriendButton extends Component
{
    public $user;

    public function render()
    {
        return view('livewire.add-new-friend-button');
    }

    public function toggleFriend($user)
    {
        auth()->user()->friendsOfMine()->toggle($user['id']);
    }
}
