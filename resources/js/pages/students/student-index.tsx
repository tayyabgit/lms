import TableWrapper from '@/components/TableWrapper';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

export default function StudentIndex() {
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="py-3 whitespace-nowrap">1</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">Alice Smith</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">alice@example.com</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">2024-05-01</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="py-3 whitespace-nowrap">2</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">Bob Johnson</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">bob@example.com</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">2024-05-10</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="py-3 whitespace-nowrap">3</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">Carol Lee</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">carol@example.com</TableCell>
                            <TableCell className="py-3 whitespace-nowrap">2024-05-15</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableWrapper>
        </AppLayout>
    );
}
