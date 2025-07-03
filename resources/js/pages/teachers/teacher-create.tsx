import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { DatePicker } from '../../components/DatePicker';

type TeacherForm = {
    name: string;
    email: string;
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

export default function TeacherCreate() {
    // Get today's date in YYYY-MM-DD format
    const { data, setData, post, processing, errors } = useForm<TeacherForm>({
        name: '',
        email: '',
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
                            autoFocus
                            autoComplete="name"
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
                            autoComplete="email"
                        />
                        <InputError message={errors.email} />
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
                        <Textarea onChange={(e) => setData('address', e.target.value)} disabled={processing} placeholder="Enter address"></Textarea>
                        <InputError message={errors.address} />
                    </div>
                </div>
                {/* Hidden Role ID */}
                <input type="hidden" name="role_id" value={data.role_id} />
                <div className="md:col-span-2">
                    <Button type="submit" className="mt-2" disabled={processing}>
                        {processing ? 'Saving...' : 'Add Teacher'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
