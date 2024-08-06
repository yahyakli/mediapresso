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
        })->get();
        $users = User::all();
        return inertia("Dashboard", ["waitingUsers" => $listItems, "Users" => $users]);
    } 

    public function accept(Request $request){
        $user = User::find($request->userId);

        if ($user) {
            $user->is_journalist = "1";
            $user->save();

            WaitingList::where('user_request_id', $user->id)->delete();

            return response()->json(['message' => 'User accepted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }

    }


    public function reject(User $user){

    }
}
