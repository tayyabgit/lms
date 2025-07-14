import { DatePicker } from '@/components/DatePicker';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface StudentEditProps {
    student: {
        id: number;
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
    classes: { id: number; name: string; section?: string }[];
}

export default function StudentEdit({ student, classes }: StudentEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: student.user.name || '',
        email: student.user.email || '',
        roll_number: student.roll_number || '',
        class_id: String(student.class_id || ''),
        admission_date: student.admission_date || '',
        gender: student.gender || '',
        dob: student.dob || '',
        address: student.address || '',
        contact_number: student.contact_number || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('students.update', student.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Students', href: '/students' },
                { title: 'Edit Student', href: `/students/${student.id}/edit` },
            ]}
            title="Edit Student"
        >
            <form className="flex w-full flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-3">
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
                        />
                        <InputError message={errors.name} />
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
                        <Select value={data.class_id} onValueChange={(value) => setData('class_id', value)} disabled={processing}>
                            <SelectTrigger id="class_id">
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* {classes.map((cls) => (
                                    <SelectItem key={cls.id} value={String(cls.id)}>
                                        {cls.name}
                                        {cls.section ? ` (${cls.section})` : ''}
                                    </SelectItem>
                                ))} */}
                                <SelectItem value="1">class1</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.class_id} />
                    </div>
                    {/* Admission Date */}
                    <div className="grid gap-2">
                        <Label htmlFor="admission_date">Admission Date</Label>
                        <DatePicker
                            value={data.admission_date}
                            onChange={(val) => setData('admission_date', val)}
                            defaultToToday={false}
                            disabled={processing}
                        />
                        <InputError message={errors.admission_date} />
                    </div>
                    {/* Gender */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)} disabled={processing}>
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Select gender" />
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
                        <DatePicker
                            value={data.dob}
                            onChange={(val) => setData('dob', val)}
                            defaultToToday={false}
                            disabled={processing}
                            maxDate={new Date()}
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
                <Button type="submit" className="w-40" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Student'}
                </Button>
            </form>
        </AppLayout>
    );
}
