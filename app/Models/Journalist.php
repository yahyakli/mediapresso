<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journalist extends Model
{

    protected $fillable = [
        'name',
        'email',
        'telephone',
        'avatar',
        'is_verified',
        'description'
    ];


    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function reacts()
    {
        return $this->morphMany(React::class, 'reactable');
    }
}
