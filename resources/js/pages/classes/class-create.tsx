import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';

interface Teacher {
    id: number;
    user_id: number;
    user?: { name: string; email: string };
}

interface Department {
    id: number;
    name: string;
}

interface ClassCreateProps {
    teachers?: Teacher[];
    departments?: Department[];
}

type ClassForm = {
    name: string;
    section: string;
    class_teacher_id: string;
    department_id: string;
};

export default function ClassCreate({ teachers = [], departments = [] }: ClassCreateProps) {
    const { data, setData, post, processing, errors } = useForm<ClassForm>({
        name: '',
        section: '',
        class_teacher_id: '',
        department_id: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Classes', href: '/classes' },
        { title: 'Add Class', href: '/classes/create' },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('classes.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Add Class">
            <form className="w-full flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
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
                    {/* Section */}
                    <div className="grid gap-2">
                        <Label htmlFor="section">Section</Label>
                        <Input
                            id="section"
                            type="text"
                            value={data.section}
                            onChange={(e) => setData('section', e.target.value)}
                            disabled={processing}
                            placeholder="Enter section (optional)"
                        />
                        <InputError message={errors.section} />
                    </div>
                    {/* Class Teacher */}
                    <div className="grid gap-2">
                        <Label htmlFor="class_teacher_id">Class Teacher</Label>
                        <Select
                            value={data.class_teacher_id || undefined}
                            onValueChange={(value) => setData('class_teacher_id', value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="class_teacher_id">
                                <SelectValue placeholder="Select class teacher (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers?.map((teacher) => (
                                    <SelectItem key={teacher.id} value={String(teacher.id)}>
                                        {teacher.user?.name ?? `Teacher #${teacher.id}`}
                                    </SelectItem>
                                )) ?? []}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.class_teacher_id} />
                    </div>
                    {/* Department */}
                    <div className="grid gap-2">
                        <Label htmlFor="department_id">Department</Label>
                        <Select
                            value={data.department_id || undefined}
                            onValueChange={(value) => setData('department_id', value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="department_id">
                                <SelectValue placeholder="Select department (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments?.map((department) => (
                                    <SelectItem key={department.id} value={String(department.id)}>
                                        {department.name}
                                    </SelectItem>
                                )) ?? []}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.department_id} />
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={processing}>
                    {processing ? 'Saving...' : 'Add Class'}
                </Button>
            </form>
        </AppLayout>
    );
}
