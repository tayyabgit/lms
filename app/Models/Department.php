<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    protected $fillable = [
        'head_teacher_id',
        'name',
        'description',
    ];

    public function headTeacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'head_teacher_id');
    }
}
