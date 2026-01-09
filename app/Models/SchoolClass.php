<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SchoolClass extends Model
{
    protected $fillable = [
        'class_teacher_id',
        'department_id',
        'name',
        'section',
    ];

<<<<<<< Updated upstream
    public function class_teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
=======
    public function classTeacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'class_teacher_id');
>>>>>>> Stashed changes
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
