<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // get all the users detail
        $users = User::get();

        // return in json format
        // check if there is a record
        // if($users)
        if($users->count() > 0)
        {
            return UserResource::collection($users);
        }
        else
        {
            return response()->json(['message' => 'No record available'], 200);
        }
    }
}
