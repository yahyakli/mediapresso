<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function blockUser(Request $request){
        $user = User::find($request->userId);
        $user->blocked_at = now();
        $user->save();

        return response()->json(['message' => "User blocked successfully"]);
    }


    public function unblockUser(Request $request){
        $user = User::find($request->userId);
        $user->blocked_at = null;
        $user->save();

        return response()->json(['message' => "User unblocked successfully"]);
    }
}
