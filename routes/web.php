<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

// GET Routes
Route::get('/users', [UserController::class, 'index'])
    ->name('users.index');

Route::get('/users/create', [UserController::class, 'create'])
    ->name('users.create');

Route::get('/user-states', [UserController::class, 'states'])
    ->name('user-states.index');

Route::get('/roles', [UserController::class, 'roles'])
    ->name('roles.index');

Route::get('/users/{user}', [UserController::class, 'detail'])
    ->name('users.detail');

// POST Routes
Route::post('/users', [UserController::class, 'store'])
    ->middleware([HandlePrecognitiveRequests::class])
    ->name('users.store');

// DELETE Routes
Route::delete('/users/{user}', [UserController::class, 'destroy'])
    ->name('users.destroy');
