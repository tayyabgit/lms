<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $fillable = [
        'class_teacher_id',
        'department_id',
        'name',
        'section',
    ];
}
