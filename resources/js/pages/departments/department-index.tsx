import TableWrapper from '@/components/TableWrapper';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { EllipsisVertical } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Departments', href: '/departments' }];

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
        <AppLayout breadcrumbs={breadcrumbs} title="Departments" btnText="Add Department" btnLink="/departments/create">
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Head Teacher</TableHead>
                            <TableHead className="text-gray-500">Description</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments?.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell className="py-3 whitespace-nowrap">{department.id}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{department.name}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{department.head_teacher_id ?? '-'}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{department.description}</TableCell>
                                <TableCell className="py-3 text-right whitespace-nowrap">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="pr-3">
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/departments/${department.id}/edit`}>Edit</Link>
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
