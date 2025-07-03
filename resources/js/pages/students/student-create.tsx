import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface StudentCreateProps {
    classes: { id: number; name: string; section?: string }[];
    users: { id: number; name: string; email: string }[];
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

export default function StudentCreate({ classes, users }: StudentCreateProps) {
    const { data, setData, post, processing, errors } = useForm<StudentForm>({
        user_id: '',
        roll_number: '',
        class_id: '',
        admission_date: '',
        gender: '',
        dob: '',
        address: '',
        contact_number: '',
    });

    console.log(classes);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('students.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Students', href: '/students' },
                { title: 'Add Student', href: '/students/create' },
            ]}
            title="Add Student"
        >
            <form className="flex w-full flex-col gap-6" onSubmit={submit}>
                {/* User */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="grid gap-4">
                        <Label htmlFor="user_id">User</Label>
                        <Select value={data.user_id} onValueChange={(value) => setData('user_id', value)} disabled={processing}>
                            <SelectTrigger id="user_id">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem key={user.id} value={String(user.id)}>
                                        {user.name} ({user.email})
                                    </SelectItem>
                                ))}
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
                        <Select value={data.class_id} onValueChange={(value) => setData('class_id', value)} disabled={processing}>
                            <SelectTrigger id="class_id">
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes.map((cls) => (
                                    <SelectItem key={cls.id} value={String(cls.id)}>
                                        {cls.name}
                                        {cls.section ? ` (${cls.section})` : ''}
                                    </SelectItem>
                                ))}
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
                        <Input id="dob" type="date" value={data.dob} onChange={(e) => setData('dob', e.target.value)} disabled={processing} />
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
                    {processing ? 'Saving...' : 'Add Student'}
                </Button>
            </form>
        </AppLayout>
    );
}
