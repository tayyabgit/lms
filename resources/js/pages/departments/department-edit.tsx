import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

interface DepartmentEditProps {
    department: {
        id: number;
        name: string;
        head_teacher_id: number | null;
        description: string | null;
    };
    teachers: Array<{ id: number; user_id: number }>;
}

export default function DepartmentEdit({ department, teachers }: DepartmentEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: department.name || '',
        head_teacher_id: department.head_teacher_id ? String(department.head_teacher_id) : '',
        description: department.description || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Departments', href: '/departments' },
        { title: 'Edit Department', href: `/departments/${department.id}/edit` },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/departments/${department.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Departments', href: '/departments' },
                { title: 'Add Department', href: '/departments/create' },
            ]}
            title="Edit Department"
        >
            <form className="flex w-full flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Enter department name"
                            className="rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                            autoFocus
                            autoComplete="off"
                        />
                        <InputError message={errors.name} />
                    </div>
                    {/* Head Teacher */}
                    <div className="grid gap-2">
                        <Label htmlFor="head_teacher_id">Head Teacher</Label>
                        <select
                            id="head_teacher_id"
                            value={data.head_teacher_id}
                            onChange={(e) => setData('head_teacher_id', e.target.value)}
                            disabled={processing}
                            className="rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select head teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.id}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.head_teacher_id} />
                    </div>
                    {/* Description */}
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            placeholder="Enter description"
                            className="min-h-[80px] rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                        />
                        <InputError message={errors.description} />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <Button type="submit" className="mt-2" disabled={processing}>
                        {processing ? 'Saving...' : 'Update Department'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
