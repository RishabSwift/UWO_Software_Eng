<?php

namespace App\Http\Livewire;

use Livewire\Component;

class Post extends Component
{
    public $post;
    public $newComment;

    public $comment;
    public $comments;

    protected $rules = [
        'comment.content' => 'required|string|max:500',
    ];



    public function render()
    {
        $this->post->load('comments');
        $this->comments = $this->post->comments;
        return view('livewire.post');
    }

    public function saveComment()
    {
        $this->validate();
        $this->post->comments()->create([
            'user_id' => auth()->user()->id,
            'content' => $this->comment['content'],
        ]);

        $this->comment['content'] = '';
    }
}
