<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

class Teacher extends Model
{
    protected $fillable = [
        'user_id',
        'firstname',
        'middlename',
        'lastname',
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

    public static function getAll($paginated = false, $request = null): Collection|LengthAwarePaginator
    {
        $teachers = Teacher::query();

        $teachers->when(isset($request) && $request->filled('search'), function ($q) use ($request) {
            $q->where(function ($s) use ($request) {
                $s->whereHas('user', function ($q) use ($request) {
                    $q->where('name', 'like', "%{$request->search}%");
                })
                    ->orWhere('employee_code', 'like', "%{$request->search}%")
                    ->orWhere('department', 'like', "%{$request->search}%")
                    ->orWhere('contact_number', 'like', "%{$request->search}%")
                    ->orWhere('subject_specialization', 'like', "%{$request->search}%")
                    ->orWhere('joining_date', 'like', "%{$request->search}%");
            });
        });

        if ($paginated) {
            $teachers = $teachers->with('user')->paginate(15)->withQueryString();
        } else {
            $teachers = $teachers->get();
        }

        return $teachers;
    }
}