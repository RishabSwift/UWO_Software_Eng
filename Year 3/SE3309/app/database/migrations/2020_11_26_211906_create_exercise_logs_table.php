<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExerciseLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercise_logs', function(Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->string('exercise_name');
            $table->integer('current_weight')->unsigned()->nullable();

            $table->unsignedBigInteger('mood_log_id')->nullable();
            $table->unsignedBigInteger('stretch_log_id')->nullable();
            $table->unsignedBigInteger('weights_log_id')->nullable();
            $table->unsignedBigInteger('cardio_log_id')->nullable();

            $table->timestamps();

            $table->foreign('exercise_name')->references('name')->on('exercises')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();

            $table->foreign('mood_log_id')->references('id')->on('mood_logs')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('stretch_log_id')->references('id')->on('stretch_logs')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('weights_log_id')->references('id')->on('weights_logs')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('cardio_log_id')->references('id')->on('cardio_logs')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercise_logs');
    }
}
