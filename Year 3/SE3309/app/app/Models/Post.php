<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{


    protected $guarded = [];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeTrending($query)
    {
        return $query->withCount('comments')
            ->whereHas('comments')
            ->with('user')
            ->where('created_at', '>', now()->subMonth())
            ->orderBy('comments_count', 'desc')
            ->limit(10);
    }
}
