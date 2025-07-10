import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

interface Teacher {
    id: number;
    user_id: number;
    user?: { name: string; email: string };
}

interface DepartmentCreateProps {
    teachers: Teacher[];
}

export default function DepartmentCreate({ teachers }: DepartmentCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        head_teacher_id: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('departments.store'));
    };
    console.log(data);

    return (
        <AppLayout
            title="Add Department"
            breadcrumbs={[
                { title: 'Departments', href: '/departments' },
                { title: 'Add Department', href: '/departments/create' },
            ]}
        >
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
                            placeholder="Enter department name"
                            autoFocus
                            autoComplete="off"
                        />
                        <InputError message={errors.name} />
                    </div>
                    {/* Head Teacher */}
                    <div className="grid gap-2">
                        <Label htmlFor="head_teacher_id">Head Teacher</Label>
                        <Select value={data.head_teacher_id} onValueChange={(value) => setData('head_teacher_id', value)} disabled={processing}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select head teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers.map((teacher) => (
                                    <SelectItem key={teacher.id} value={String(teacher.id)}>
                                        {teacher.user?.name}
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
                        {processing ? 'Saving...' : 'Add Department'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
