<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    protected $fillable = [
        'content',
        'user_id',
        'post_id',
        'parent_id'
    ];



    public function commentable(){
        return $this->morphTo();
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function isReply()
    {
        return $this->parent_id !== null;
    }
}
