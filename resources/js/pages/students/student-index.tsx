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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

interface StudentIndexProps {
    students: Array<{
        id: number;
        roll_number: string;
        admission_date: string | null;
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
    }>;
}

export default function StudentIndex({ students }: StudentIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this student?')) {
            router.delete(route('students.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Students" btnText="Add Student" btnLink="/students/create">
            <div className="p- overflow-x-auto rounded-xl border">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Email</TableHead>
                            <TableHead className="w-[150px] px-3 text-gray-500">Roll Number</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Class</TableHead>
                            <TableHead className="text-gray-500">Admission Date</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students?.length > 0 ? (
                            students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="py-3 whitespace-nowrap">{student.id}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{student.user?.name ?? '-'}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{student.user?.email ?? '-'}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{student.roll_number}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">
                                        {student.class
                                            ? `${student.class.name}${student.class.section ? ` (${student.class.section})` : ''}`
                                            : '-'}
                                    </TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">
                                        {student.admission_date
                                            ? new Date(student.admission_date).toLocaleDateString()
                                            : '-'}
                                    </TableCell>
                                    <TableCell className="py-3 text-right whitespace-nowrap">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="pr-3">
                                                <EllipsisVertical />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('students.show', student.id)}>View</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('students.edit', student.id)}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(student.id)}
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
                                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                    No students found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
