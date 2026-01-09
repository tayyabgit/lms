<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'firstname',
        'middlename',
        'lastname',
        'roll_number',
        'class_id',
        'admission_date',
        'gender',
        'dob',
        'address',
        'contact_number',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function class(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }
}
