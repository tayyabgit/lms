import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
    teachers: Array<{ id: number; user_id: number; user: { name: string } }>;
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
        <AppLayout breadcrumbs={breadcrumbs} title="Edit Department">
            <form className="flex w-full flex-col gap-6" onSubmit={submit}>
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
                            placeholder="Enter name"
                            className="rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                            autoFocus
                            autoComplete="name"
                        />
                        <InputError message={errors.name} />
                    </div>
                    {/* Head Teacher */}
                    <div className="grid gap-2">
                        <Label htmlFor="head_teacher_id">Head Teacher</Label>
                        {/* Debug logs for Select value matching */}
                        <Select value={data.head_teacher_id} onValueChange={(value) => setData('head_teacher_id', value)} disabled={processing}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select head teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers.map((teacher) => (
                                    <SelectItem key={teacher.id} value={String(teacher.id)}>
                                        {teacher.user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.head_teacher_id} />
                    </div>
                    {/* Description */}
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            placeholder="Enter description"
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
