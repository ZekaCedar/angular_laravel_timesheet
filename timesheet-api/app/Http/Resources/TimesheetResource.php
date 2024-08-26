<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimesheetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return[
            'id'=>$this->id,
            'projectName'=>$this->projectName,
            'taskName'=>$this->taskName,
            'assignUser'=>$this->assignUser,
            'taskStatus'=>$this->taskStatus,
            'category'=>$this->category,
            'userId'=>$this->userId,
            'statusId'=>$this->statusId,
            'taskStartDt'=>$this->taskStartDt,
            'taskEndDt'=>$this->taskEndDt,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
        ];
    }
}
