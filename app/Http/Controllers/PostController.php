<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Comment;
use App\Models\Post;
use App\Models\React;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create(){
        return inertia("post/Create");
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'attachments' => 'nullable|array|max:10',
            'attachments.*' => 'file|max:1024000',
            'category' => 'required|string|max:255',
        ]);

        $userId = auth()->user()->id;
        $post = Post::create([
            'user_id' => $userId,
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);

        $files = $request->attachments;

        $attachments = [];
        if($files){
            foreach($files as $file){
                $directory = 'attachments/'.Str::random(32);
                Storage::makeDirectory($directory);
                $model = [
                    'post_id' => $post->id,
                    'file_mime' => $file->getClientMimeType(),
                    'file_path' => $file->store($directory, "public"),
                ];
                Attachment::create($model);
                $attachments[] = $directory;
            }
        }
        return redirect(route('home'));
    }

    public function like(Request $request){
        $request->validate([
            'post_id' => 'required|exists:posts,id',
        ]);

        $userId = auth()->id();
        $postId = $request->post_id;

        $react = React::where('user_id', $userId)
                    ->where('post_id', $postId)
                    ->first();

        if ($react) {
            $react->delete();
            Post::where('id', $postId)->decrement('likes_count');
        } else {
            React::create([
                'user_id' => $userId,
                'post_id' => $postId,
            ]);
            Post::where('id', $postId)->increment('likes_count');
        }
        return inertia('home');
    }

    public function createComment(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'content' => 'required|string|max:1000',
            'post_id' => 'required',
            'parent_id' => 'nullable'
        ]);

        // Get the authenticated user's ID
        $userId = auth()->id();

        // Create a new comment with the validated data
        Comment::create([
            'content' => $request->content,
            'user_id' => $userId,
            'post_id' => $request->post_id,
            'parent_id' => $request->parent_id, // Include parent_id if it's provided
        ]);
        Post::where('id', $request->post_id)->increment('comments_count');

        // Redirect back to the home page or wherever is appropriate
        return inertia(route('home'));
    }


}
