<<<<<<< Updated upstream
import { DatePicker } from '@/components/DatePicker';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
=======
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
>>>>>>> Stashed changes

interface StudentEditProps {
    student: {
        id: number;
<<<<<<< Updated upstream
        user: {
            id: number;
            name: string;
            email: string;
        };
        roll_number: string;
        class_id: string;
        admission_date: string;
        gender: string;
        dob: string;
        address: string;
        contact_number: string;
    };
}

export default function StudentEdit({ student }: StudentEditProps) {
    // Split the name into parts for initial values
    const nameParts = (student.user.name || '').split(' ');
    const firstname = nameParts[0] || '';
    const middlename = nameParts.length === 3 ? nameParts[1] : '';
    const lastname = nameParts.length === 3 ? nameParts[2] : nameParts[1] || '';
    const { data, setData, put, processing, errors } = useForm({
        firstname,
        middlename,
        lastname,
        email: student.user.email || '',
        roll_number: student.roll_number || '',
        class_id: String(student.class_id || ''),
        admission_date: student.admission_date || '',
        gender: student.gender || '',
        dob: student.dob || '',
        address: student.address || '',
        contact_number: student.contact_number || '',
    });

=======
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

>>>>>>> Stashed changes
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('students.update', student.id));
    };

    return (
<<<<<<< Updated upstream
        <AppLayout
            breadcrumbs={[
                { title: 'Students', href: '/students' },
                { title: 'Edit Student', href: `/students/${student.id}/edit` },
            ]}
            title="Edit Student"
        >
            <form className="flex w-full flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* First Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                            id="firstname"
                            type="text"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                            disabled={processing}
                            placeholder="Enter first name"
                        />
                        <InputError message={errors.firstname} />
                    </div>
                    {/* Middle Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="middlename">Middle Name</Label>
                        <Input
                            id="middlename"
                            type="text"
                            value={data.middlename}
                            onChange={(e) => setData('middlename', e.target.value)}
                            disabled={processing}
                            placeholder="Enter middle name (optional)"
                        />
                        <InputError message={errors.middlename} />
                    </div>
                    {/* Last Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input
                            id="lastname"
                            type="text"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            disabled={processing}
                            placeholder="Enter last name"
                        />
                        <InputError message={errors.lastname} />
                    </div>
                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="Enter email"
                        />
                        <InputError message={errors.email} />
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        <Select value={data.class_id} onValueChange={(value) => setData('class_id', value)} disabled={processing}>
=======
                        <Select
                            value={data.class_id || undefined}
                            onValueChange={(value) => setData('class_id', value)}
                            disabled={processing}
                        >
>>>>>>> Stashed changes
                            <SelectTrigger id="class_id">
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
<<<<<<< Updated upstream
                                {/* {classes.map((cls) => (
                                    <SelectItem key={cls.id} value={String(cls.id)}>
                                        {cls.name}
                                        {cls.section ? ` (${cls.section})` : ''}
                                    </SelectItem>
                                ))} */}
                                <SelectItem value="1">class1</SelectItem>
=======
                                {classes?.map((cls) => (
                                    <SelectItem key={cls.id} value={String(cls.id)}>
                                        {cls.name}{cls.section ? ` (${cls.section})` : ''}
                                    </SelectItem>
                                )) ?? []}
>>>>>>> Stashed changes
                            </SelectContent>
                        </Select>
                        <InputError message={errors.class_id} />
                    </div>
                    {/* Admission Date */}
                    <div className="grid gap-2">
                        <Label htmlFor="admission_date">Admission Date</Label>
<<<<<<< Updated upstream
                        <DatePicker
                            value={data.admission_date}
                            onChange={(val) => setData('admission_date', val)}
                            defaultToToday={false}
=======
                        <Input
                            id="admission_date"
                            type="date"
                            value={data.admission_date}
                            onChange={(e) => setData('admission_date', e.target.value)}
>>>>>>> Stashed changes
                            disabled={processing}
                        />
                        <InputError message={errors.admission_date} />
                    </div>
                    {/* Gender */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
<<<<<<< Updated upstream
                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)} disabled={processing}>
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Select gender" />
=======
                        <Select
                            value={data.gender || undefined}
                            onValueChange={(value) => setData('gender', value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Select gender (optional)" />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        <DatePicker
                            value={data.dob}
                            onChange={(val) => setData('dob', val)}
                            defaultToToday={false}
                            disabled={processing}
                            maxDate={new Date()}
=======
                        <Input
                            id="dob"
                            type="date"
                            value={data.dob}
                            onChange={(e) => setData('dob', e.target.value)}
                            disabled={processing}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <Button type="submit" className="w-40" disabled={processing}>
=======
                <Button type="submit" className="w-full" disabled={processing}>
>>>>>>> Stashed changes
                    {processing ? 'Updating...' : 'Update Student'}
                </Button>
            </form>
        </AppLayout>
    );
}
