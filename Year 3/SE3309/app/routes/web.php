<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home');


Route::group(['middleware' => 'auth'], function() {
    Route::get('/profile/{user}', 'ProfileController@index')->name('profile.index');
    Route::get('/account/settings', 'ProfileController@settings')->name('profile.settings');
    Route::get('/dashboard', 'DashboardController@index')->name('dashboard.index');
    Route::get('/exercise-logs', 'DashboardController@exerciseLogs')->name('dashboard.exercise_log');
    Route::get('/profile/{user}/add-friend', 'ProfileController@addFriend')->name('profile.add_friend');
    Route::delete('/profile/delete', 'ProfileController@delete')->name('profile.delete');

    Route::get('/profile/{user}/posts/{post}', 'ProfileController@showPost')->name('profile.post.show');
    Route::post('/new-post', 'ProfileController@newPost')->name('post.store');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
