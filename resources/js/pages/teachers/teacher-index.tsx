import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { EllipsisVertical } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Teachers', href: '/teachers' }];

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
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            router.delete(route('teachers.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Teachers" btnText="Add Teacher" btnLink="/teachers/create">
            <div className="p- overflow-x-auto rounded-xl border">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Employee Code</TableHead>
                            <TableHead className="text-gray-500">Department</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers?.length > 0 ? (
                            teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell className="py-3 whitespace-nowrap">{teacher.id}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{teacher.user?.name ?? '-'}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{teacher.employee_code}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{teacher.department}</TableCell>
                                    <TableCell className="py-3 text-right whitespace-nowrap">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="pr-3">
                                                <EllipsisVertical />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('teachers.show', teacher.id)}>View</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('teachers.edit', teacher.id)}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(teacher.id)}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                                    No teachers found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
