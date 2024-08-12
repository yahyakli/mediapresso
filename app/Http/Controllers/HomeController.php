<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(){
        $userId = Auth::id();
        $posts = Post::with('attachments')->with('reacts')->orderBy('created_at', 'desc')->get();

        foreach ($posts as $post) {
            $post->liked = $post->reacts->where('user_id', $userId)->isNotEmpty();
        }
        
        $users = User::all();
        return inertia('Home', [
            'posts' => $posts,
            'users' => $users,
        ]);
    }
}
