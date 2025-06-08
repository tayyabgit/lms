import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Departments', href: '/departments' },
];

interface DepartmentIndexProps {
    departments: Array<{
        id: number;
        name: string;
        head_teacher_id: number | null;
        description: string | null;
        head_teacher?: { id: number; user_id: number };
    }>;
}

export default function DepartmentIndex({ departments }: DepartmentIndexProps) {
    return (
        <AppLayout>
            <Head title="Departments" />
            <div className="flex flex-col items-center bg-background min-h-screen pt-10">
                <div className="w-full max-w-none px-4 md:px-12">
                    <div className="mb-6">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <h2 className="text-2xl font-semibold mb-2 text-left">Departments</h2>
                        <hr className="mb-6" />
                    </div>
                    <div className="flex justify-end mb-4">
                        <Link href="/departments/create">
                            <Button>Add Department</Button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head Teacher</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {departments?.map((department) => (
                                    <tr key={department.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{department.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{department.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{department.head_teacher_id ?? '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{department.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={`/departments/${department.id}/edit`} className="mr-2 text-blue-600 hover:underline">Edit</Link>
                                            <Link href={`/departments/${department.id}`} className="text-blue-600 hover:underline">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 