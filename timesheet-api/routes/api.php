<?php

use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\TimesheetController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('timesheets', TimesheetController::class);

Route::apiResource('users', UserController::class);

Route::apiResource('status', StatusController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
