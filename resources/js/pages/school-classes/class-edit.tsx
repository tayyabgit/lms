import SectionDropdown from '@/components/SectionsDropdown';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage } from '@inertiajs/react';

interface Teacher {
    id: number;
    firstname: string;
    middlename: string;
    lastname: string;
}

interface Department {
    id: number;
    name: string;
}

interface ComponentProps {
    teachers: Teacher[];
    departments: Department[];
}

export default function ClassEdit({ teachers, departments }: ComponentProps) {
    const { schoolClass } = usePage().props as unknown as {
        schoolClass: {
            id: number;
            department_id: number;
            class_teacher_id: number;
            name: string;
            section: string;
            class_teacher: {
                firstname: string;
                middlename: string;
                lastname: string;
            };
            department: {
                name: string;
            };
        };
    };

    const { data, put, processing, setData, errors } = useForm({
        id: schoolClass.id,
        name: schoolClass.name,
        section: schoolClass.section,
        department_id: schoolClass.department_id,
        class_teacher_id: schoolClass.class_teacher_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('classes.update', schoolClass.id));
    };

    return (
        <AppLayout
            title="Edit Class"
            breadcrumbs={[
                { title: 'Classes', href: '/classes' },
                { title: 'Edit Class', href: '/classes/edit' },
            ]}
        >
            <form className="flex w-full flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">Class Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Enter class name"
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>
                    {/* Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">Section</Label>
                        {/* <Input
                            id="Section"
                            type="text"
                            value={data.section}
                            onChange={(e) => setData('section', e.target.value)}
                            disabled={processing}
                            placeholder="Enter section name"
                            autoFocus
                        /> */}
                        <SectionDropdown
                            value={data.section ? String(data.section) : ''}
                            onValueChange={(value) => setData('section', value)}
                            disabled={processing}
                        />
                        <InputError message={errors.section} />
                    </div>
                    {/* Class teachers list */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Class Teacher</Label>
                        <Select
                            value={data.class_teacher_id ? String(data.class_teacher_id) : ''}
                            onValueChange={(value) => setData('class_teacher_id', Number(value))}
                            disabled={processing}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers.map(function (teacher) {
                                    return (
                                        <SelectItem key={teacher.id} value={String(teacher.id)}>
                                            {teacher.firstname} {teacher.middlename} {teacher.lastname}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.class_teacher_id} />
                    </div>
                    {/* Departments list */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Department</Label>
                        <Select
                            value={data.department_id ? String(data.department_id) : ''}
                            onValueChange={(value) => setData('department_id', Number(value))}
                            disabled={processing}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map(function (department) {
                                    return (
                                        <SelectItem key={department.id} value={String(department.id)}>
                                            {department.name}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.department_id} />
                    </div>
                    <div className="md:col-span-2">
                        <Button type="submit" className="mt-2" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Class'}
                        </Button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
