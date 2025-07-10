import TableWrapper from '@/components/TableWrapper';
import FilterWrapper from '@/components/ui/FilterWrapper';
import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Departments', href: '/departments' }];

interface DepartmentIndexProps {
    departments: Array<{
        id: number;
        name: string;
        head_teacher_id: number | null;
        description: string | null;
        head_teacher?: { user: { name: string } };
    }>;
}

export default function DepartmentIndex({ departments }: DepartmentIndexProps) {
    const { data, setData, get, processing } = useForm({
        search: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('departments.index'), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Departments" btnText="Add Department" btnLink="/departments/create">
            <FilterWrapper>
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
            </FilterWrapper>
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
                        {departments?.map((department) => {
                            console.log(department.head_teacher?.user.name);

                            return (
                                <TableRow key={department.id}>
                                    <TableCell className="py-3 whitespace-nowrap">{department.id}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{department.name}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{department.head_teacher?.user?.name ?? '-'}</TableCell>
                                    <TableCell className="py-3 whitespace-nowrap">{department.description}</TableCell>
                                    <TableCell className="py-3 text-right whitespace-nowrap">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="pr-3">
                                                <Anchor href="#" variant="ghost">
                                                    <Ellipsis />
                                                </Anchor>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/departments/${department.id}/edit`}>Edit</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableWrapper>
        </AppLayout>
    );
}
