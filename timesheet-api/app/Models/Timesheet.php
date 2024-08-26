<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timesheet extends Model
{
    use HasFactory;

    protected $table='timesheets';

    protected $fillable = [
        'projectName',
        'taskName',
        'assignUser',
        'taskStatus',
        'category',
        'userId',
        'statusId',
        'taskStartDt',
        'taskEndDt'
    ];

}
