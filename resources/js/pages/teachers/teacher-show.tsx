import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TeacherShowProps {
    teacher: {
        id: number;
        employee_code: string;
        qualification: string;
        department: string;
        subject_specialization: string;
        joining_date: string;
        gender: string;
        contact_number: string;
        address: string;
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function TeacherShow({ teacher }: TeacherShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Teachers', href: '/teachers' },
        { title: teacher.user?.name ?? `Teacher #${teacher.id}`, href: `/teachers/${teacher.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={teacher.user?.name ?? `Teacher #${teacher.id}`}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href={route('teachers.edit', teacher.id)}>Edit</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Teacher Information</CardTitle>
                        <CardDescription>Details about the teacher</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">ID</label>
                            <p className="mt-1">{teacher.id}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="mt-1">{teacher.user?.name ?? '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="mt-1">{teacher.user?.email ?? '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Employee Code</label>
                            <p className="mt-1">{teacher.employee_code}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Qualification</label>
                            <p className="mt-1">{teacher.qualification}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Department</label>
                            <p className="mt-1">{teacher.department}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Subject Specialization</label>
                            <p className="mt-1">{teacher.subject_specialization}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Joining Date</label>
                            <p className="mt-1">
                                {new Date(teacher.joining_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Gender</label>
                            <p className="mt-1">{teacher.gender}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Contact Number</label>
                            <p className="mt-1">{teacher.contact_number}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Address</label>
                            <p className="mt-1">{teacher.address}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
