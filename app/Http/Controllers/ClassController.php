<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\SchoolClass;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        $classes = SchoolClass::with(['classTeacher.user', 'department'])
            ->select('id', 'class_teacher_id', 'department_id', 'name', 'section')
            ->get();

        return Inertia::render('classes/class-index', [
            'classes' => $classes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        $teachers = Teacher::with('user')->get();
        $departments = Department::get(['id', 'name']);

        return Inertia::render('classes/class-create', [
            'teachers' => $teachers,
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $request->all();
        $data['class_teacher_id'] = $data['class_teacher_id'] === '' ? null : $data['class_teacher_id'];
        $data['department_id'] = $data['department_id'] === '' ? null : $data['department_id'];

        $validated = validator($data, [
            'name' => ['required', 'string', 'max:255'],
            'section' => ['nullable', 'string', 'max:50'],
            'class_teacher_id' => ['nullable', 'exists:teachers,id'],
            'department_id' => ['nullable', 'exists:departments,id'],
        ])->validate();

        SchoolClass::create($validated);

        return redirect()->route('classes.index')->with('success', 'Class created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SchoolClass $class): \Inertia\Response
    {
        $class->load(['classTeacher.user', 'department']);

        return Inertia::render('classes/class-show', [
            'class' => $class,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SchoolClass $class): \Inertia\Response
    {
        $teachers = Teacher::with('user')->get();
        $departments = Department::get(['id', 'name']);
        $class->load(['classTeacher.user', 'department']);

        return Inertia::render('classes/class-edit', [
            'class' => $class,
            'teachers' => $teachers,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SchoolClass $class): \Illuminate\Http\RedirectResponse
    {
        $data = $request->all();
        $data['class_teacher_id'] = $data['class_teacher_id'] === '' ? null : $data['class_teacher_id'];
        $data['department_id'] = $data['department_id'] === '' ? null : $data['department_id'];

        $validated = validator($data, [
            'name' => ['required', 'string', 'max:255'],
            'section' => ['nullable', 'string', 'max:50'],
            'class_teacher_id' => ['nullable', 'exists:teachers,id'],
            'department_id' => ['nullable', 'exists:departments,id'],
        ])->validate();

        $class->update($validated);

        return redirect()->route('classes.index')->with('success', 'Class updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolClass $class): \Illuminate\Http\RedirectResponse
    {
        $class->delete();

        return redirect()->route('classes.index')->with('success', 'Class deleted successfully.');
    }
}
