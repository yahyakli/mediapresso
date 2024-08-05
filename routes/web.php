<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WaitingListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return  redirect(route('home', absolute: false));
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware('auth', 'admin')->group(function(){
    Route::get('/dashboard', [WaitingListController::class, 'index'])->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
