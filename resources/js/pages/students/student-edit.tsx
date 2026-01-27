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

interface StudentEditProps {
    student: {
        id: number;
        user_id: number;
        roll_number: string;
        class_id: number;
        admission_date: string | null;
        gender: string | null;
        dob: string | null;
        address: string | null;
        contact_number: string | null;
    };
    classes?: { id: number; name: string; section?: string | null }[];
    users?: { id: number; name: string; email: string }[];
}

type StudentForm = {
    user_id: string;
    roll_number: string;
    class_id: string;
    admission_date: string;
    gender: string;
    dob: string;
    address: string;
    contact_number: string;
};

export default function StudentEdit({ student, classes = [], users = [] }: StudentEditProps) {
    const { data, setData, put, processing, errors } = useForm<StudentForm>({
        user_id: String(student.user_id),
        roll_number: student.roll_number,
        class_id: String(student.class_id),
        admission_date: student.admission_date ?? '',
        gender: student.gender ?? '',
        dob: student.dob ?? '',
        address: student.address ?? '',
        contact_number: student.contact_number ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Students', href: '/students' },
        { title: 'Edit Student', href: `/students/${student.id}/edit` },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('students.update', student.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Edit Student">
            <form className="w-full flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* User */}
                    <div className="grid gap-4">
                        <Label htmlFor="user_id">User</Label>
                        <Select
                            value={data.user_id || undefined}
                            onValueChange={(value) => setData('user_id', value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="user_id">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users?.map((user) => (
                                    <SelectItem key={user.id} value={String(user.id)}>
                                        {user.name} ({user.email})
                                    </SelectItem>
                                )) ?? []}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.user_id} />
                    </div>
                    {/* Roll Number */}
                    <div className="grid gap-2">
                        <Label htmlFor="roll_number">Roll Number</Label>
                        <Input
                            id="roll_number"
                            type="text"
                            value={data.roll_number}
                            onChange={(e) => setData('roll_number', e.target.value)}
                            disabled={processing}
                            placeholder="Enter roll number"
                        />
                        <InputError message={errors.roll_number} />
                    </div>
                    {/* Class */}
                    <div className="grid gap-2">
                        <Label htmlFor="class_id">Class</Label>
                        <Select
                            value={data.class_id || undefined}
                            onValueChange={(value) => setData('class_id', value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="class_id">
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes?.map((cls) => (
                                    <SelectItem key={cls.id} value={String(cls.id)}>
                                        {cls.name}{cls.section ? ` (${cls.section})` : ''}
                                    </SelectItem>
                                )) ?? []}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.class_id} />
                    </div>
                    {/* Admission Date */}
                    <div className="grid gap-2">
                        <Label htmlFor="admission_date">Admission Date</Label>
                        <Input
                            id="admission_date"
                            type="date"
                            value={data.admission_date}
                            onChange={(e) => setData('admission_date', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.admission_date} />
                    </div>
                    {/* Gender */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            value={data.gender || undefined}
                            onValueChange={(value) => setData('gender', value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Select gender (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.gender} />
                    </div>
                    {/* Date of Birth */}
                    <div className="grid gap-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                            id="dob"
                            type="date"
                            value={data.dob}
                            onChange={(e) => setData('dob', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.dob} />
                    </div>
                    {/* Address */}
                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={processing}
                            placeholder="Enter address"
                        />
                        <InputError message={errors.address} />
                    </div>
                    {/* Contact Number */}
                    <div className="grid gap-2">
                        <Label htmlFor="contact_number">Contact Number</Label>
                        <Input
                            id="contact_number"
                            type="text"
                            value={data.contact_number}
                            onChange={(e) => setData('contact_number', e.target.value)}
                            disabled={processing}
                            placeholder="Enter contact number"
                        />
                        <InputError message={errors.contact_number} />
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Student'}
                </Button>
            </form>
        </AppLayout>
    );
}
