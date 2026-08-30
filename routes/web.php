<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// GET Routes
Route::get('/users', [UserController::class, 'index'])
    ->name('users.index');

Route::get('/users/{user}/address', [UserController::class, 'address'])
    ->name('users.address');

Route::get('/users/{user}/notes', [UserController::class, 'notes'])
    ->name('users.notes');

Route::get('/users/create', [UserController::class, 'create'])
    ->name('users.create');

Route::get('/user-states', [UserController::class, 'states'])
    ->name('user-states.index');

Route::get('/roles', [UserController::class, 'roles'])
    ->name('roles.index');

// POST Routes
Route::post('/users', [UserController::class, 'store'])
    ->name('users.store');

// DELETE Routes
Route::delete('/users/{user}', [UserController::class, 'destroy'])
    ->name('users.destroy');
