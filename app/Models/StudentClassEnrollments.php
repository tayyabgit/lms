<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentClassEnrollments extends Model
{
    protected $fillable = [
        'student_id',
        'school_class_id',
        'academic_year_id',
        'roll_number',
    ];
}
