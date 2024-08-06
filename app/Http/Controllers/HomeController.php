<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $posts = Post::all();
        return inertia('Home', [
            'posts' => $posts,
        ]);
    }
}
