import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import CommonPageLayout from '@/components/common-page-layout';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Teachers', href: '/teachers' },
];

interface TeacherIndexProps {
    teachers: Array<{
        id: number;
        user?: { name: string; email: string };
        employee_code: string;
        department: string;
        subject_specialization: string;
        joining_date: string;
        gender: string;
        contact_number: string;
        address: string;
    }>;
}

export default function TeacherIndex({ teachers }: TeacherIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CommonPageLayout
                header={
                <>
                    <h2 className="text-2xl font-semibold mb-2 text-left">Add Teacher</h2>
                </>
                }
            >
            <Head title="Teachers" />
            <div className="flex flex-col items-center bg-background min-h-screen pt-1">
                <div className="w-full max-w-7xl px-4 md:px-12">
                    {/* <div className="mb-6">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <h2 className="text-2xl font-semibold mb-2 text-left">Teachers</h2>
                        <hr className="mb-6" />
                    </div> */}
                    <div className="flex justify-end mb-4">
                        <Link href="/teachers/create">
                            <Button>Add Teacher</Button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {teachers?.map((teacher) => (
                                    <tr key={teacher.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{teacher.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{teacher.user?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{teacher.employee_code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{teacher.department}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={`/teachers/${teacher.id}/edit`} className="mr-2 text-blue-600 hover:underline">Edit</Link>
                                            <Link href={`/teachers/${teacher.id}`} className="text-blue-600 hover:underline">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </CommonPageLayout>
        </AppLayout>
    );
} 