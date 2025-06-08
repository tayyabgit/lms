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
        // Optionally, you may want to select users who are not yet students
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('students/student-create', [
            'classes' => $classes,
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:students,user_id',
            'roll_number' => 'required|string|unique:students,roll_number',
            'class_id' => 'required|exists:school_classes,id',
            'admission_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'dob' => 'nullable|date',
            'address' => 'nullable|string',
            'contact_number' => 'nullable|string',
        ]);
        $student = Student::create($validated);
        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $student = Student::with(['user', 'class'])->findOrFail($id);
        return Inertia::render('students/student-show', [
            'student' => $student
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $student = Student::findOrFail($id);
        $classes = SchoolClass::select('id', 'name', 'section')->get();
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('students/student-edit', [
            'student' => $student,
            'classes' => $classes,
            'users' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::findOrFail($id);
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:students,user_id,' . $student->id,
            'roll_number' => 'required|string|unique:students,roll_number,' . $student->id,
            'class_id' => 'required|exists:school_classes,id',
            'admission_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'dob' => 'nullable|date',
            'address' => 'nullable|string',
            'contact_number' => 'nullable|string',
        ]);
        $student->update($validated);
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
