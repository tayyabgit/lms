import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

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
                        <Input
                            id="joining_date"
                            type="date"
                            value={data.joining_date}
                            onChange={(e) => setData('joining_date', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.joining_date} />
                    </div>
                    {/* Gender */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            id="gender"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            disabled={processing}
                            className="rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
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
                        <textarea
                            id="address"
                            rows={15}
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={processing}
                            placeholder="Enter address"
                        >
                            {data.address}
                        </textarea>
                        <InputError message={errors.address} />
                    </div>
                </div>
                {/* Hidden Role ID */}
                <input type="hidden" name="role_id" value={data.role_id} />
                <div className="md:col-span-2">
                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing ? 'Saving...' : 'Add Teacher'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
