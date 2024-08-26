<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TimesheetResource;
use App\Models\Timesheet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TimesheetController extends Controller
{
    public function index(Request $request)
    {
        // get all the timesheets detail
        // $timesheets = Timesheet::get();

        // Get the search keyword from the request, if provided
        $search = $request->input('search');
        // dd($search); // This will output the value of $search and stop execution
        Log::info('Showing the search keyword info:', ['search' => $search]);

        // get all the timesheets detail ordered by taskStartDt in descending order
        // $timesheets = Timesheet::orderBy('taskStartDt', 'desc')->get();

        // Check if there is a search keyword
        DB::enableQueryLog(); // Enable query log

        if ($search) {
            // If a search keyword is provided, filter the timesheets based on multiple fields
            $timesheets = Timesheet::where(function($query) use ($search) {
                $query->where('projectName', 'like', "%$search%")
                    ->orWhere('taskName', 'like', "%$search%")
                    ->orWhere('assignUser', 'like', "%$search%"); // Add other fields as needed
            })
            ->orderBy('taskStartDt', 'desc')
            ->get();
        } else {
            // If no search keyword is provided, get all timesheets ordered by taskStartDt in descending order
            $timesheets = Timesheet::orderBy('taskStartDt', 'desc')->get();
        }

        // Dump query log
        // dd(DB::getQueryLog());

        // return in json format
        // check if there is a record
        // if($timesheets)
        if($timesheets->count() > 0)
        {
            return TimesheetResource::collection($timesheets);
        }
        else
        {
            return response()->json(['message' => 'No record available'], 200);
        }
    }

    public function store(Request $request)
    {
        // validation
        $validator = Validator::make($request->all(),[
            'projectName' => 'required|string|max:255',
            'taskName' => 'required|string|max:255',
            'assignUser' => 'required|string|max:255',
            'taskStatus' => 'required|string|max:255',
            'category' => 'required|string|max:255',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'message' => 'All fields are mandatory',
                'error' => $validator->messages(),
            ], 422);
        }

        // $request->validate([
        //     'projectName' => 'required|string|max:255',
        //     'taskName' => 'required|string|max:255',
        //     'assignUser' => 'required|string|max:255',
        //     'taskStatus' => 'required|string|max:255',
        //     'category' => 'required|string|max:255',
        // ]);

        // inserting the record
        $timesheet =  Timesheet::create([
            'projectName' => $request->projectName,
            'taskName' => $request->taskName,
            'assignUser' => $request->assignUser,
            'taskStatus' => $request->taskStatus,
            'category' => $request->category,
            'taskStartDt' => $request->taskStartDt,
            'taskEndDt' => $request->taskEndDt,
        ]);

        return response()->json([
            'message' => 'Timesheet Created Successfully',
            'data' => new TimesheetResource($timesheet),
        ], 200);

    }

    public function show(Timesheet $timesheet)
    {
        return new TimesheetResource($timesheet);
    }

    public function update(Request $request, Timesheet $timesheet)
    {
        // validation
        $validator = Validator::make($request->all(),[
            'projectName' => 'required|string|max:255',
            'taskName' => 'required|string|max:255',
            'assignUser' => 'required|string|max:255',
            'taskStatus' => 'required|string|max:255',
            'category' => 'required|string|max:255',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'message' => 'All fields are mandatory',
                'error' => $validator->messages(),
            ], 422);
        }

        // inserting the record
        $timesheet->update([
            'projectName' => $request->projectName,
            'taskName' => $request->taskName,
            'assignUser' => $request->assignUser,
            'taskStatus' => $request->taskStatus,
            'category' => $request->category,
            'taskStartDt' => $request->taskStartDt,
            'taskEndDt' => $request->taskEndDt,
        ]);

        return response()->json([
            'message' => 'Timesheet Updated Successfully',
            'data' => new TimesheetResource($timesheet),
        ], 200);

    }

    public function destroy(Timesheet $timesheet)
    {
        $timesheet->delete();

        return response()->json([
            'message' => 'Timesheet Deleted Successfully',
        ], 200);

    }

}
