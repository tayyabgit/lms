import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StudentShowProps {
    student: {
        id: number;
        roll_number: string;
        admission_date: string | null;
        gender: string | null;
        dob: string | null;
        address: string | null;
        contact_number: string | null;
        user?: {
            id: number;
            name: string;
            email: string;
        };
        class?: {
            id: number;
            name: string;
            section: string | null;
        };
    };
}

export default function StudentShow({ student }: StudentShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Students', href: '/students' },
        { title: student.user?.name ?? `Student #${student.id}`, href: `/students/${student.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={student.user?.name ?? `Student #${student.id}`}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href={route('students.edit', student.id)}>Edit</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                        <CardDescription>Details about the student</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">ID</label>
                            <p className="mt-1">{student.id}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="mt-1">{student.user?.name ?? '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="mt-1">{student.user?.email ?? '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Roll Number</label>
                            <p className="mt-1">{student.roll_number}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Class</label>
                            <p className="mt-1">
                                {student.class
                                    ? `${student.class.name}${student.class.section ? ` (${student.class.section})` : ''}`
                                    : '-'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Admission Date</label>
                            <p className="mt-1">
                                {student.admission_date
                                    ? new Date(student.admission_date).toLocaleDateString()
                                    : '-'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Gender</label>
                            <p className="mt-1">{student.gender ?? '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                            <p className="mt-1">
                                {student.dob ? new Date(student.dob).toLocaleDateString() : '-'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Address</label>
                            <p className="mt-1">{student.address ?? '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Contact Number</label>
                            <p className="mt-1">{student.contact_number ?? '-'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
