<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $posts = Post::with('attachments')->orderBy('created_at', 'desc')->get();
        $users = User::all();
        return inertia('Home', [
            'posts' => $posts,
            'users' => $users,
        ]);
    }
}
