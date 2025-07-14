import TableWrapper from '@/components/TableWrapper';
import { Anchor } from '@/components/ui/anchor';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';

interface StudentUser {
    id: number;
    name: string;
    email: string;
}

interface Student {
    id: number;
    user: StudentUser;
    admission_date: string;
    roll_number: string;
    class_id: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

export default function StudentIndex() {
    const { students } = usePage<{ students: Student[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Students" btnText="Add Student" btnLink="/students/create">
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Email</TableHead>
                            <TableHead className="text-gray-500">Enrollment Date</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="py-3 whitespace-nowrap">{student.id}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{student.user?.name}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{student.user?.email}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{student.admission_date}</TableCell>
                                <TableCell className="py-3 text-right whitespace-nowrap">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="pr-3">
                                            <Anchor href="#" variant="ghost">
                                                <Ellipsis />
                                            </Anchor>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <a href={`/students/${student.id}/edit`}>Edit</a>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        </AppLayout>
    );
}
