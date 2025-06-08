<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with('headTeacher')->get();
        return Inertia::render('departments/department-index', [
            'departments' => $departments,
        ]);
    }

    public function create()
    {
        $teachers = Teacher::all(['id', 'user_id']);
        return Inertia::render('departments/department-create', [
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'head_teacher_id' => 'nullable|exists:teachers,id',
            'description' => 'nullable|string|max:1000',
        ];
        $validated = $request->validate($rules);
        Department::create($validated);
        return redirect()->route('departments.index')->with('success', 'Department created successfully.');
    }

    public function show(Department $department)
    {
        $department->load('headTeacher');
        return Inertia::render('departments/department-show', [
            'department' => $department,
        ]);
    }

    public function edit(Department $department)
    {
        $teachers = Teacher::all(['id', 'user_id']);
        $department->load('headTeacher');
        return Inertia::render('departments/department-edit', [
            'department' => $department,
            'teachers' => $teachers,
        ]);
    }

    public function update(Request $request, Department $department)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'head_teacher_id' => 'nullable|exists:teachers,id',
            'description' => 'nullable|string|max:1000',
        ];
        $validated = $request->validate($rules);
        $department->update($validated);
        return redirect()->route('departments.index')->with('success', 'Department updated successfully.');
    }

    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route('departments.index')->with('success', 'Department deleted successfully.');
    }
}
