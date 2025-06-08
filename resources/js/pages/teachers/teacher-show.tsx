import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import CommonPageLayout from '@/components/common-page-layout';

export default function TeacherShow() {
    const { teacher } = (usePage().props as unknown) as {
        teacher: {
            id: number;
            user?: { name: string; email: string };
            employee_code: string;
            qualification: string;
            department: string;
            subject_specialization: string;
            joining_date: string;
            gender: string;
            contact_number: string;
            address: string;
        };
    };

    const breadcrumbs = [
        { title: 'Teachers', href: '/teachers' },
        { title: teacher.user?.name || 'Teacher Profile', href: `/teachers/${teacher.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CommonPageLayout
                header={
                    <>
                        <h2 className="text-2xl font-semibold mb-2 text-left">{teacher.user?.name || 'Teacher Profile'}</h2>
                    </>
                }
            >
            <Head title={teacher.user?.name ? `${teacher.user.name} - Profile` : 'Teacher Profile'} />
            <div className="flex flex-col items-center bg-background min-h-screen pt-10">
                <div className="w-full max-w-none px-4 md:px-12">
                    <div className="w-full bg-white rounded-xl shadow p-8 flex flex-col gap-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-gray-500 text-sm">{teacher.user?.email}</p>
                            </div>
                            <Link href={`/teachers/${teacher.id}/edit`}>
                                <Button variant="outline">Edit Profile</Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="mb-2">
                                    <span className="font-semibold">Employee Code:</span> {teacher.employee_code}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Department:</span> {teacher.department}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Qualification:</span> {teacher.qualification}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Subject Specialization:</span> {teacher.subject_specialization}
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <span className="font-semibold">Joining Date:</span> {teacher.joining_date}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Gender:</span> {teacher.gender}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Contact Number:</span> {teacher.contact_number}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Address:</span> {teacher.address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </CommonPageLayout>
        </AppLayout>
    );
} 