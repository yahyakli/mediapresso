<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WaitingList;
use Illuminate\Http\Request;

class WaitingListController extends Controller
{
    public function index(){
        // $listItems = WaitingList::all();
        $listItems = User::whereIn('id', function($query) {
            $query->select('user_request_id')
            ->from('waiting_lists');
        })->get();
        return inertia("Dashboard", ["users" => $listItems]);
    } 
}
