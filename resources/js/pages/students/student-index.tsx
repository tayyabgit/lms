import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

export default function StudentIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end mb-4">
                    <Link href="/students/create">
                        <Button>Add Student</Button>
                    </Link>
                </div>
                <div className="flex flex-wrap gap-4 items-end mb-4">
                    <div>
                        <label htmlFor="filter-name" className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                        <input id="filter-name" type="text" placeholder="Search by name" className="border rounded px-3 py-2 text-sm w-48" />
                    </div>
                    <div>
                        <label htmlFor="filter-email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                        <input id="filter-email" type="text" placeholder="Search by email" className="border rounded px-3 py-2 text-sm w-48" />
                    </div>
                    <div>
                        <label htmlFor="filter-date" className="block text-xs font-medium text-gray-700 mb-1">Enrollment Date</label>
                        <input id="filter-date" type="date" className="border rounded px-3 py-2 text-sm w-48" />
                    </div>
                </div>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 whitespace-nowrap">Alice Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap">alice@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap">2024-05-01</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">2</td>
                                <td className="px-6 py-4 whitespace-nowrap">Bob Johnson</td>
                                <td className="px-6 py-4 whitespace-nowrap">bob@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap">2024-05-10</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">3</td>
                                <td className="px-6 py-4 whitespace-nowrap">Carol Lee</td>
                                <td className="px-6 py-4 whitespace-nowrap">carol@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap">2024-05-15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}