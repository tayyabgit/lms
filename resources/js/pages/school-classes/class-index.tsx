import TableWrapper from '@/components/TableWrapper';
import { Anchor } from '@/components/ui/anchor';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';

interface SchoolCourse {
    id: number;
    class_teacher_id: number;
    department_id: number;
    name: string;
    section: string;
    created_at: Date;
    updated_at: Date;
    class_teacher: {
        firstname: string;
        middlename: string;
        lastname: string;
    };
    department: {
        name: string;
    };
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface SchoolCourses {
    classes: {
        data: SchoolCourse[];
        links: PaginationLinks[];
        current_page: number;
        last_page: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Teachers', href: '/teachers' }];

export default function ClassIndex({ classes }: SchoolCourses) {
    console.log(classes);

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Add Class" btnText="Add Class" btnLink="/classes/create">
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Class Teacher</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Department</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Section</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="py-3 text-center whitespace-nowrap">{item.id}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{item.name}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{item.class_teacher.firstname}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{item.department.name}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{item.section}</TableCell>
                                <TableCell className="py-3 text-right whitespace-nowrap">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="pr-3">
                                            <Anchor href="#" variant="ghost">
                                                <Ellipsis />
                                            </Anchor>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/classes/${item.id}/edit`}>Edit</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
            {/* <PaginationWrapper links={courses?.links} /> */}
        </AppLayout>
    );
}
