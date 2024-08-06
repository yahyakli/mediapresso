<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WaitingList;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class WaitingListController extends Controller
{
    public function index(){
        $listItems = User::whereIn('id', function($query) {
            $query->select('user_request_id')
            ->from('waiting_lists');
        })
        ->orderBy('created_at', 'desc')
        ->get();
        $users = User::where('is_admin', false)->orderBy('created_at', 'desc')->get();
        $journalists = User::where('is_journalist', true)->orderBy('created_at', 'desc')->get();
        $blockedUsers = User::where('is_blocked', true)->orderBy('created_at', 'desc')->get();
        return inertia("Dashboard", [
            "waitingUsers" => $listItems,
            "Users" => $users,
            "Journalists" => $journalists,
            "BlockedUsers" => $blockedUsers,
        ]);
    } 

    public function accept(Request $request){
        $user = User::find($request->userId);

        if ($user) {
            $user->is_journalist = true;
            $user->save();

            WaitingList::where('user_request_id', $user->id)->delete();

            return response()->json(['message' => 'User accepted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }

    }


    public function reject(Request $request){
        $user = User::find($request->userId);
        if($user){
            WaitingList::where('user_request_id', $user->id)->delete();
            return response()->json(['message' => 'User Rejected successfully']);
        }else{
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
