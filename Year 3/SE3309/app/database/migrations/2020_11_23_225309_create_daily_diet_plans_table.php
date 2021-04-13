<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDailyDietPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_diet_plans', function (Blueprint $table) {
            $table->string('plan_name');
            $table->unsignedBigInteger('daily_diet_id');

            $table->foreign('plan_name')->references('name')->on('plans');
            $table->foreign('daily_diet_id')->references('id')->on('daily_diets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daily_diet_plans');
    }
}
