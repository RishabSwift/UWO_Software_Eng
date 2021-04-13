<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Plan;
use App\Models\ExerciseLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $trendingPosts = Post::trending()->get();
        return view('dashboard.index', compact('trendingPosts'));
    }

    public function exerciseLogs()
    {
        $logs = ExerciseLog::whereUserId(auth()->user()->id)->latest()->get();
        try {
            $logs->load([
                'moodLog',
                'stretchLog',
                'cardioLog',
                'weightLog',
            ]);
        } catch (\Exception $ex) {

        }
        return view('dashboard.exercise_log', compact('logs'));
    }

    public function insertMoodLog()
    {
        return DB::select("BEGIN;
INSERT INTO `mood_logs` (`mood_scale`)
values (9);
INSERT INTO `exercise_logs` (`exercise_name`, `current_weight`, `user_id`, `mood_log_id`, `updated_at`, `created_at`)
values ('Breathing', 190, (
    SELECT `id`
    FROM `users`
    WHERE `username` = '{$this->username}'), LAST_INSERT_ID(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
COMMIT;

");
    }

    public function updateGoal($goal_name)
    {
        return DB::select("
        UPDATE
    `users`
SET
    `goal_name` = '{$goal_name}',
    `users`.`updated_at` = CURRENT_TIMESTAMP
WHERE
        `id` = {$this->id}");
    }
}
