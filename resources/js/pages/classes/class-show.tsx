import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ClassShowProps {
    class: {
        id: number;
        name: string;
        section: string | null;
        class_teacher_id: number | null;
        department_id: number | null;
        class_teacher?: {
            id: number;
            user?: { name: string; email: string };
        };
        department?: {
            id: number;
            name: string;
        };
    };
}

export default function ClassShow({ class: classItem }: ClassShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Classes', href: '/classes' },
        { title: classItem.name, href: `/classes/${classItem.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={classItem.name}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href={route('classes.edit', classItem.id)}>Edit</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Class Information</CardTitle>
                        <CardDescription>Details about the class</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">ID</label>
                            <p className="mt-1">{classItem.id}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="mt-1">{classItem.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Section</label>
                            <p className="mt-1">{classItem.section ?? '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Class Teacher</label>
                            <p className="mt-1">
                                {classItem.class_teacher?.user?.name ?? '-'}
                                {classItem.class_teacher?.user?.email && (
                                    <span className="text-gray-500"> ({classItem.class_teacher.user.email})</span>
                                )}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Department</label>
                            <p className="mt-1">{classItem.department?.name ?? '-'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
