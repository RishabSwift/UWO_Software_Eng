<?php

namespace App;

use App\Models\Post;
use App\Models\Goal;
use App\Models\Comment;
use App\Models\ExerciseLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'username';
    }

    //1. TODO get routekey name to be username


    public function goal()
    {
        return $this->hasOne(Goal::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class)->latest();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function exerciseLogs()
    {
        return $this->hasMany(ExerciseLog::class);
    }

    public function lastExerciseLog()
    {
        return $this->exerciseLogs()->latest()->limit(1);
    }

    //    public function friends()
    //    {
    //        return $this->belongsToMany(User::class, 'user_friends', 'user_id', 'friend_id');
    //    }

    // friendship that I started
    function friendsOfMine()
    {
        return $this->belongsToMany(User::class, 'user_friends', 'user_id', 'friend_id')->withCount('comments')->withCount('posts');
    }

    // friendship that I was invited to
    function friendOf()
    {
        return $this->belongsToMany(User::class, 'user_friends', 'friend_id', 'user_id')->withCount('comments')->withCount('posts');
    }

    // accessor allowing you call $user->friends
    public function getFriendsAttribute()
    {
        if (!array_key_exists('friends', $this->relations))
            $this->loadFriends();

        return $this->getRelation('friends');
    }

    protected function loadFriends()
    {
        if (!array_key_exists('friends', $this->relations)) {
            $friends = $this->mergeFriends();

            $this->setRelation('friends', $friends);
        }
    }

    protected function mergeFriends()
    {
        return $this->friendsOfMine->merge($this->friendOf);
    }


    public function getLastWorkout()
    {
        return optional(optional($this->lastExerciseLog()->first())->created_at)->diffForHumans();
    }

    public function getFriendsWithSameGoal()
    {
        return $this->friends->where('goal_name', $this->goal_name);
    }


    public function isFriendsWith($user)
    {
        return !!count($this->friends->where('id', $user->id));
    }


    public function getAvatarAttribute()
    {
        return 'https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg';
    }

    public function fgetSadFriends()
    {
        //        dd($this->loadFriends());
    }

    public function getSadFriends()
    {
        return count(DB::select("
                SELECT `friend_id`,
               `username`
        FROM `users`
                 INNER JOIN `user_friends` ON `users`.`id` = `user_friends`.`friend_id`
        WHERE `user_friends`.`user_id` = {$this->id}
          AND EXISTS(
                SELECT *
                FROM `exercise_logs`
                WHERE `users`.`id` = `exercise_logs`.`user_id`
                  AND EXISTS(
                        SELECT *
                        FROM `mood_logs`
                        WHERE `exercise_logs`.`mood_log_id` = `mood_logs`.`id`
                          AND `mood_scale` < 5))
        "));
    }

    public function getTotalWeightLost()
    {
        $query = DB::select("
        
        SELECT B.current_weight - A.current_weight AS weight_loss
FROM
        ( SELECT created_at,
                current_weight
         FROM exercise_logs
         WHERE user_id = {$this->id}
         ORDER BY created_at DESC
         LIMIT 1) A,
     (
         SELECT created_at,
                current_weight
         FROM exercise_logs
         WHERE user_id = {$this->id}
         ORDER BY created_at ASC
         LIMIT 1) B;
         
         ");

        if (!$query) {
            return 0;
        }

        return $query[0]->weight_loss;
    }


    public function search()
    {
        return DB::select("
        SELECT
	`users`.*,
	(
		SELECT
			count(*)
		FROM
			`posts`
		WHERE
			`users`.`id` = `posts`.`user_id`) AS `posts_count`, (
			SELECT
				count(*)
			FROM
				`comments`
			WHERE
				`users`.`id` = `comments`.`user_id`) AS `comments_count`
		FROM
			`users`
		WHERE
			`username` LIKE '%{$this->username}%'
		LIMIT 100 OFFSET 0");
    }
}
