<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $teachers = Teacher::getAll(true, $request);
        return Inertia::render('teachers/teacher-index', [
            'teachers' => $teachers,
        ]);
    }

    public function create()
    {
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('teachers/teacher-create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'firstname' => 'required|string|max:255',
            'middlename' => 'string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role_id' => 'required|integer|exists:roles,id',
            'employee_code' => 'required|string|max:50|unique:teachers,employee_code',
            'qualification' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'subject_specialization' => 'required|string|max:255',
            'joining_date' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'contact_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ];
        $validated = $request->validate($rules);
        $user = User::create([
            'name' => $validated['firstname'] . ' ' . $validated['middlename'] . ' ' . $validated['lastname'],
            'email' => $validated['email'],
            'role_id' => $validated['role_id'],
        ]);
        $teacherData = $validated;
        $teacherData['user_id'] = $user->id;
        Teacher::create($teacherData);
        return redirect()->route('teachers.index')->with('success', 'Teacher created successfully.');
    }

    public function edit(Teacher $teacher)
    {
        return Inertia::render('teachers/teacher-edit', [
            'teacher' => $teacher->load('user'),
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $rules = [
            'firstname' => 'required|string|max:255',
            'middlename' => 'string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $teacher->user_id,
            'password' => 'nullable|string|confirmed|min:8',
            'role_id' => 'required|integer|exists:roles,id',
            'employee_code' => 'required|string|max:50|unique:teachers,employee_code,' . $teacher->id,
            'qualification' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'subject_specialization' => 'required|string|max:255',
            'joining_date' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'contact_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ];
        $validated = $request->validate($rules);
        $user = $teacher->user;
        $user->name = $validated['firstname'] . ' ' . $validated['middlename'] . ' ' . $validated['lastname'];
        $user->email = $validated['email'];
        $user->role_id = $validated['role_id'];
        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }
        $user->save();
        $teacherData = $validated;
        $teacher->update($teacherData);
        return redirect()->route('teachers.index')->with('success', 'Teacher updated successfully.');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return redirect()->route('teachers.index')->with('success', 'Teacher deleted successfully.');
    }
}