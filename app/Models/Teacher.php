<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'user_id',
        'employee_code',
        'qualification',
        'department',
        'subject_specialization',
        'joining_date',
        'gender',
        'contact_number',
        'address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
