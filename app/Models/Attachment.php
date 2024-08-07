<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'post_id',
        'file_path',
        'file_mime'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
