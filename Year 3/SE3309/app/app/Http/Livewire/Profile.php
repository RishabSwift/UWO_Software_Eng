<?php

namespace App\Http\Livewire;

use App\User;
use Livewire\Component;

class Profile extends Component
{
    public $posts;
    public $user;
    public $friends;

    protected $listeners = ['postAdded' => 'reloadPosts'];

    public function render()
    {

        $this->user = session('profile_user');
        $this->user->load('posts.comments');
        $this->user->load('posts.user');

        $this->posts = $this->user->posts;

        return view('livewire.profile');
    }

    public function addFriend($user)
    {
        auth()->user()->friendsOfMine()->toggle($user['id']);
    }

    public function reloadPosts()
    {
        $this->posts = $this->user->fresh()->posts;
    }


}
