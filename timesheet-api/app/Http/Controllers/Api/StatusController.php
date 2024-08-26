<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusResource;
use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function index()
    {
        // get all the status detail
        $status = Status::get();

        // return in json format
        // check if there is a record
        // if($users)
        if($status->count() > 0)
        {
            return StatusResource::collection($status);
        }
        else
        {
            return response()->json(['message' => 'No record available'], 200);
        }
    }
}
