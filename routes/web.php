<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index'])
    ->name('users.index');

Route::get('/users/{user}/address', [UserController::class, 'address'])
    ->name('users.address');

Route::get('/users/{user}/notes', [UserController::class, 'notes'])
    ->name('users.notes');

Route::post('/users', [UserController::class, 'store'])
    ->name('users.store');

Route::delete('/users/{user}', [UserController::class, 'destroy'])
    ->name('users.destroy');
