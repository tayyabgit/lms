<?php

namespace App\Http\Controllers;

<<<<<<< Updated upstream
use App\Http\Requests\SchoolClassRequest;
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        $classes = SchoolClass::with('class_teacher', 'department')->paginate(15);
        return Inertia::render('school-classes/class-index', ['classes' => $classes]);
=======
        $classes = SchoolClass::with(['classTeacher.user', 'department'])
            ->select('id', 'class_teacher_id', 'department_id', 'name', 'section')
            ->get();

        return Inertia::render('classes/class-index', [
            'classes' => $classes,
        ]);
>>>>>>> Stashed changes
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
<<<<<<< Updated upstream
        $teachers = Teacher::getAll(false);
        $departments = Department::all();
        return Inertia::render('school-classes/class-create', compact('teachers', 'departments'));
=======
        $teachers = Teacher::with('user')->get();
        $departments = Department::get(['id', 'name']);

        return Inertia::render('classes/class-create', [
            'teachers' => $teachers,
            'departments' => $departments,
        ]);
>>>>>>> Stashed changes
    }

    /**
     * Store a newly created resource in storage.
     */
<<<<<<< Updated upstream
    public function store(SchoolClassRequest $request)
    {
        if (SchoolClass::create($request->validated())) {
            return redirect()->route('classes.index')->with('success', 'Class has been added successfully!');
        } else {
            return back()->with('error', 'Class has not been added!');
        }
=======
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
>>>>>>> Stashed changes
    }

    /**
     * Show the form for editing the specified resource.
     */
<<<<<<< Updated upstream
    public function edit(SchoolClass $class)
    {
        $schoolClass = $class;
        $teachers = Teacher::getAll(false);
        $departments = Department::all();

        return Inertia::render('school-classes/class-edit', compact('teachers', 'departments', 'schoolClass'));
=======
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
>>>>>>> Stashed changes
    }

    /**
     * Update the specified resource in storage.
     */
<<<<<<< Updated upstream
    public function update(SchoolClassRequest $request, SchoolClass $class)
    {
        if ($class->update($request->validated())) {
            return redirect()->route('classes.index')->with('success', 'Class has been updated successfully!');
        } else {
            return back()->with('error', 'Class has not been updated!');
        }
=======
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
>>>>>>> Stashed changes
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