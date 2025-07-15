<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use App\Models\User;
use App\Models\SchoolClass;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with(['user', 'class'])
            ->select('id', 'user_id', 'roll_number', 'class_id', 'admission_date')
            ->get();
        return Inertia::render('students/student-index', [
            'students' => $students
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $classes = SchoolClass::select('id', 'name', 'section')->get();
        return Inertia::render('students/student-create', [
            'classes' => $classes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed|min:8',
            'roll_number' => 'required|string|unique:students,roll_number',
            'class_id' => 'required',
            'admission_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'dob' => 'nullable|date',
            'address' => 'nullable|string',
            'contact_number' => 'nullable|string',
        ];
        $validated = $request->validate($rules);
        $roleId = \App\Models\Role::where('name', 'student')->value('id');
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role_id' => $roleId,
        ]);
        $studentData = $validated;
        $studentData['user_id'] = $user->id;
        unset($studentData['name'], $studentData['email'], $studentData['password'], $studentData['password_confirmation']);
        Student::create($studentData);
        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $student = Student::with('user')->findOrFail($id);
        $classes = SchoolClass::select('id', 'name', 'section')->get();
        return Inertia::render('students/student-edit', [
            'student' => $student,
            'classes' => $classes
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::with('user')->findOrFail($id);
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $student->user_id,
            'password' => 'nullable|string|confirmed|min:8',
            'roll_number' => 'required|string|unique:students,roll_number,' . $student->id,
            'class_id' => 'required',
            'admission_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'dob' => 'nullable|date',
            'address' => 'nullable|string',
            'contact_number' => 'nullable|string',
        ];
        $validated = $request->validate($rules);
        $user = $student->user;
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }
        $user->save();
        $studentData = $validated;
        unset($studentData['name'], $studentData['email'], $studentData['password'], $studentData['password_confirmation']);
        $student->update($studentData);
        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Student deleted successfully.');
    }
}