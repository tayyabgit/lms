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

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Classes', href: '/classes' }];

interface ClassIndexProps {
    classes: Array<{
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
    }>;
}

export default function ClassIndex({ classes }: ClassIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this class?')) {
            router.delete(route('classes.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Classes" btnText="Add Class" btnLink="/classes/create">
            <div className="p- overflow-x-auto rounded-xl border">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[150px] px-3 text-gray-500">Section</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Class Teacher</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Department</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes?.map((classItem) => (
                            <TableRow key={classItem.id}>
                                <TableCell className="py-3 whitespace-nowrap">{classItem.id}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{classItem.name}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{classItem.section ?? '-'}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">
                                    {classItem.class_teacher?.user?.name ?? '-'}
                                </TableCell>
                                <TableCell className="py-3 whitespace-nowrap">
                                    {classItem.department?.name ?? '-'}
                                </TableCell>
                                <TableCell className="py-3 text-right whitespace-nowrap">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="pr-3">
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('classes.show', classItem.id)}>View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('classes.edit', classItem.id)}>Edit</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(classItem.id)}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </DropdownMenuItem>
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
