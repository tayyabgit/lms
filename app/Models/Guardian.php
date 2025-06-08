<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    protected $fillable = [
        'user_id',
        'occupation',
        'relation_with_student',
        'contact_number',
        'email',
        'address',
    ];
}
