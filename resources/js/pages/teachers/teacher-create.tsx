import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<<<<<<< Updated upstream
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
=======
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
>>>>>>> Stashed changes
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { DatePicker } from '../../components/DatePicker';

interface Role {
    id: number;
    name: string;
}

interface TeacherCreateProps {
    roles?: Role[];
}

type TeacherForm = {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    role_id: string;
    employee_code: string;
    qualification: string;
    department: string;
    subject_specialization: string;
    joining_date: string;
    gender: string;
    contact_number: string;
    address: string;
};

export default function TeacherCreate({ roles = [] }: TeacherCreateProps) {
    const { data, setData, post, processing, errors } = useForm<TeacherForm>({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '2',
        employee_code: '',
        qualification: '',
        department: '',
        subject_specialization: '',
        joining_date: '',
        gender: '',
        contact_number: '',
        address: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('teachers.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Teachers', href: '/teachers' },
                { title: 'Add Teacher', href: '/teachers/create' },
            ]}
            title="Add Teacher"
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
                            autoFocus
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
                            placeholder="Enter middle name"
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
                            autoComplete="email"
                        />
                        <InputError message={errors.email} />
                    </div>
                    {/* Password */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Enter password"
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password} />
                    </div>
                    {/* Password Confirmation */}
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    {/* Role */}
                    <div className="grid gap-2">
                        <Label htmlFor="role_id">Role</Label>
                        <Select
                            value={data.role_id || undefined}
                            onValueChange={(value) => setData('role_id', value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="role_id">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={String(role.id)}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role_id} />
                    </div>
                    {/* Employee Code */}
                    <div className="grid gap-2">
                        <Label htmlFor="employee_code">Employee Code</Label>
                        <Input
                            id="employee_code"
                            type="text"
                            value={data.employee_code}
                            onChange={(e) => setData('employee_code', e.target.value)}
                            disabled={processing}
                            placeholder="Enter employee code"
                        />
                        <InputError message={errors.employee_code} />
                    </div>
                    {/* Qualification */}
                    <div className="grid gap-2">
                        <Label htmlFor="qualification">Qualification</Label>
                        <Input
                            id="qualification"
                            type="text"
                            value={data.qualification}
                            onChange={(e) => setData('qualification', e.target.value)}
                            disabled={processing}
                            placeholder="Enter qualification"
                        />
                        <InputError message={errors.qualification} />
                    </div>
                    {/* Department */}
                    <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                            id="department"
                            type="text"
                            value={data.department}
                            onChange={(e) => setData('department', e.target.value)}
                            disabled={processing}
                            placeholder="Enter department"
                        />
                        <InputError message={errors.department} />
                    </div>
                    {/* Subject Specialization */}
                    <div className="grid gap-2">
                        <Label htmlFor="subject_specialization">Subject Specialization</Label>
                        <Input
                            id="subject_specialization"
                            type="text"
                            value={data.subject_specialization}
                            onChange={(e) => setData('subject_specialization', e.target.value)}
                            disabled={processing}
                            placeholder="Enter subject specialization"
                        />
                        <InputError message={errors.subject_specialization} />
                    </div>
                    {/* Joining Date */}
                    <div className="grid gap-2">
                        <Label htmlFor="joining_date">Joining Date</Label>
                        <DatePicker
                            value={data.joining_date}
                            onChange={(val) => setData('joining_date', val)}
                            defaultToToday={true}
                            disabled={processing}
                        />
                        <InputError message={errors.joining_date} />
                    </div>
                    {/* Gender */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)} disabled={processing}>
                            <SelectTrigger>
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
                    {/* Address */}
                    <div className="grid gap-2 md:col-span-3">
                        <Label htmlFor="address">Address</Label>
<<<<<<< Updated upstream
                        <Textarea onChange={(e) => setData('address', e.target.value)} disabled={processing} placeholder="Enter address"></Textarea>
                        <InputError message={errors.address} />
                    </div>
                </div>
                {/* Hidden Role ID */}
                <input type="hidden" name="role_id" value={data.role_id} />
                <div className="md:col-span-2">
                    <Button type="submit" className="mt-2" disabled={processing}>
=======
                        <textarea
                            id="address"
                            rows={4}
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={processing}
                            placeholder="Enter address"
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-[60px] w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        />
                        <InputError message={errors.address} />
                    </div>
                </div>
                <div className="md:col-span-3">
                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
>>>>>>> Stashed changes
                        {processing ? 'Saving...' : 'Add Teacher'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
