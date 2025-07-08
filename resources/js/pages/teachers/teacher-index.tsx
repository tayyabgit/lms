import TableWrapper from '@/components/TableWrapper';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';

import PaginationWrapper from '@/components/PaginationWrapper';
import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationLink } from '@/components/ui/pagination';
import { Ellipsis } from 'lucide-react';

interface Teacher {
    id: number;
    user?: { name: string; email: string };
    employee_code: string;
    department: string;
    subject_specialization: string;
    joining_date: string;
    gender: string;
    contact_number: string;
    address: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TeacherIndexProps {
    teachers: {
        data: Teacher[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Teachers', href: '/teachers' }];

export default function TeacherIndex({ teachers }: TeacherIndexProps) {
    const { data, setData, get, processing } = useForm({
        search: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('teachers.index'), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Teachers" btnText="Add Teacher" btnLink="/teachers/create">
            <div className="mt-2 mb-6">
                <form action="" method="get" onSubmit={submit}>
                    <div className="grid gap-6 md:grid-cols-1">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Search</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                disabled={processing}
                                placeholder="Enter name"
                                autoFocus
                                autoComplete="name"
                            />
                        </div>
                    </div>
                    <div className="mt-2 md:col-span-2">
                        <Button type="submit" className="mt-2" disabled={processing}>
                            {processing ? 'Saving...' : 'Add Teacher'}
                        </Button>
                        <Anchor href={route('teachers.index')} variant="ghost" className="mt-2 ml-2" disabled={processing}>
                            Reset
                        </Anchor>
                    </div>
                </form>
            </div>
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px] px-3 text-gray-500">ID</TableHead>
                            <TableHead className="w-[200px] px-3 text-gray-500">Name</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Employee Code</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Department</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Specialization</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Contact</TableHead>
                            <TableHead className="w-[300px] px-3 text-gray-500">Joining</TableHead>
                            <TableHead className="text-right text-gray-500"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.data.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell className="py-3 text-center whitespace-nowrap">{teacher.id}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.user?.name}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.employee_code}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.department}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.subject_specialization}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.contact_number}</TableCell>
                                <TableCell className="py-3 whitespace-nowrap">{teacher.joining_date}</TableCell>
                                <TableCell className="py-3 text-right whitespace-nowrap">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="pr-3">
                                            <Anchor href="#" variant="ghost">
                                                <Ellipsis />
                                            </Anchor>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/teachers/${teacher.id}/edit`}>Edit</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
            <PaginationWrapper links={teachers?.links} />
        </AppLayout>
    );
}
