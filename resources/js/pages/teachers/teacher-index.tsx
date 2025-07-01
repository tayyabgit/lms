import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Teachers" btnText="Add Teacher" btnLink="/teachers/create">
            <div className="p- overflow-x-auto rounded-xl border">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Employee</TableHead>
                            <TableHead className="text-gray-500">Department</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers?.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.id}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.user?.name}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.employee_code}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.department}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">
                                    {/* <Link href={`/teachers/${teacher.id}/edit`} className="mr-2 text-blue-600 hover:underline">
                                        Edit
                                    </Link> */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Billing</DropdownMenuItem>
                                            <DropdownMenuItem>Team</DropdownMenuItem>
                                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
