<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolClassRequest;
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
    public function index()
    {
        $classes = SchoolClass::with('class_teacher', 'department')->paginate(15);
        return Inertia::render('school-classes/class-index', ['classes' => $classes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = Teacher::getAll(false);
        $departments = Department::all();
        return Inertia::render('school-classes/class-create', compact('teachers', 'departments'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SchoolClassRequest $request)
    {
        if (SchoolClass::create($request->validated())) {
            return redirect()->route('classes.index')->with('success', 'Class has been added successfully!');
        } else {
            return back()->with('error', 'Class has not been added!');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SchoolClass $class)
    {
        $schoolClass = $class;
        $teachers = Teacher::getAll(false);
        $departments = Department::all();

        return Inertia::render('school-classes/class-edit', compact('teachers', 'departments', 'schoolClass'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SchoolClassRequest $request, SchoolClass $class)
    {
        if ($class->update($request->validated())) {
            return redirect()->route('classes.index')->with('success', 'Class has been updated successfully!');
        } else {
            return back()->with('error', 'Class has not been updated!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}