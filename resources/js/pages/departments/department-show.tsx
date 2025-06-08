import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import CommonPageLayout from '@/components/common-page-layout';

export default function DepartmentShow() {
  const { department } = (usePage().props as unknown) as {
    department: {
      id: number;
      name: string;
      head_teacher_id: number | null;
      description: string | null;
      head_teacher?: { id: number; user_id: number };
    };
  };

  const breadcrumbs = [
    { title: 'Departments', href: '/departments' },
    { title: department.name, href: `/departments/${department.id}` },
  ];

  return (
    <AppLayout>
      <Head title={department.name ? `${department.name} - Department` : 'Department'} />
      <CommonPageLayout
        header={
          <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h2 className="text-2xl font-semibold mb-2 text-left">{department.name}</h2>
            <hr className="mb-6" />
          </>
        }
      >
        <div className="w-full bg-white rounded-xl shadow p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm">Department ID: {department.id}</p>
            </div>
            <Link href={`/departments/${department.id}/edit`}>
              <Button variant="outline">Edit Department</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2">
                <span className="font-semibold">Head Teacher ID:</span> {department.head_teacher_id ?? '-'}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Description:</span> {department.description}
              </div>
            </div>
          </div>
        </div>
      </CommonPageLayout>
    </AppLayout>
  );
} 