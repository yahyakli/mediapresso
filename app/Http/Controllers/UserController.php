<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function blockUser(Request $request){
        $user = User::find($request->userId);
        $user->is_blocked = true;
        $user->save();

        return response()->json(['message' => "User blocked successfully"]);
    }


    public function unblockUser(Request $request){
        $user = User::find($request->userId);
        $user->is_blocked = false;
        $user->save();

        return response()->json(['message' => "User unblocked successfully"]);
    }
}
