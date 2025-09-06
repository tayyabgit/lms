import { DatePicker } from '@/components/DatePicker';
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
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    roll_number: string;
    class_id: string;
    admission_date: string;
    gender: string;
    dob: string;
    address: string;
    contact_number: string;
};

export default function StudentCreate({ classes }: StudentCreateProps) {
    const { data, setData, post, processing, errors } = useForm<StudentForm>({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        roll_number: '',
        class_id: '',
        admission_date: '',
        gender: '',
        dob: '',
        address: '',
        contact_number: '',
    });
    console.log(errors);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

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
                        <DatePicker
                            value={data.admission_date}
                            onChange={(val) => setData('admission_date', val)}
                            defaultToToday={true}
                            disabled={processing}
                            maxDate={new Date()}
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
                    {processing ? 'Saving...' : 'Add Student'}
                </Button>
            </form>
        </AppLayout>
    );
}
