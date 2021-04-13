<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExercisePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercise_plans', function (Blueprint $table) {
            $table->string('plan_name');
            $table->string('exercise_name');

            $table->foreign('plan_name')->references('name')->on('plans');
            $table->foreign('exercise_name')->references('name')->on('exercises');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercise_plans');
    }
}
