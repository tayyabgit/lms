<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->unsignedBigInteger('class_id');
            $table->string('firstname');
            $table->string('middlename');
            $table->string('lastname');
            $table->string('roll_number')->unique();
            $table->date('admission_date')->nullable();
            $table->string('gender')->nullable();
            $table->date('dob')->nullable();
            $table->string('address')->nullable();
            $table->string('contact_number')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};