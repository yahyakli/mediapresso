<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WaitingListController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return  redirect(route('home', absolute: false));
});

Route::get('/home', [HomeController::class, 'index'])->middleware('active')->name('home');

Route::middleware('auth', 'admin', 'active')->group(function(){
    Route::get('/dashboard', [WaitingListController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/accept', [WaitingListController::class, 'accept'])->name('accept-user');
    Route::post('/dashboard/reject', [WaitingListController::class, 'reject'])->name('reject-user');
    Route::post('/dashboard/deblock', [UserController::class, 'unblockUser'])->name('deblock-user');
    Route::post('/dashboard/block', [UserController::class, 'blockUser'])->name('block-user');
});

Route::middleware('auth', 'active', 'journalist')->group(function(){
    Route::get('/post/create', [PostController::class, 'create'])->name('post.create');
    Route::post('/post/store', [PostController::class, 'store'])->name('post.store');
    Route::post('/post/edit/{post}', [PostController::class, 'edit'])->name('post.edit');
    Route::post('/post/delete/{post}', [PostController::class, 'delete'])->name('post.delete');
});

Route::middleware('auth', 'active')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/post/like/{post}', [PostController::class, 'like'])->name('post.like');
    Route::post('/post/createComment/{post}', [PostController::class, 'createComment'])->name('post.createComment');
});

require __DIR__.'/auth.php';
