<?php

use App\Http\Controllers\ClassController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('students', StudentController::class);
    Route::resource('classes', ClassController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('departments', DepartmentController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
