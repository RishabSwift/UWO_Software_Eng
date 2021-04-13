<?php

namespace App\Http\Controllers;

use App\User;
use App\Models\Post;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(User $user)
    {

        session()->put('profile_user', $user);
        //        auth()->loginUsingId(2502);
        //        $user->load('posts.comments');
        //        $user->load('posts.user');
        //        $posts = $user->posts;

        return view('profile.index');
    }

    public function settings()
    {
        $user = auth()->user();
        return view('profile.settings', compact('user'));
    }

    public function addFriend(User $user)
    {
        auth()->user()->friends()->sync($user);
    }

    public function newPost(Request $request)
    {
        $request->validate([
            'content' => 'required|string|min:5',
        ]);

        auth()->user()->posts()->create([
            'content' => $request->input('content'),
        ]);

        return back();
    }

    public function delete()
    {
        auth()->user()->delete();
        flash('Goodbye. Thanks for trying us out!');
        return redirect(route('home'));
    }

    public function showPost(User $user, Post $post)
    {
        $post->load('comments.user');
        return view('profile.show_post', compact('post', 'user'));
    }
}
