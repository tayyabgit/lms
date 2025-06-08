import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import CommonPageLayout from '@/components/common-page-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useMemo } from 'react';

interface Teacher {
  id: number;
  user_id: number;
  user?: { name: string; email: string };
}

interface DepartmentCreateProps {
  teachers: Teacher[];
}

export default function DepartmentCreate({ teachers }: DepartmentCreateProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    head_teacher_id: '',
    description: '',
  });

  const teacherOptions = useMemo(() =>
    teachers?.map((teacher) => ({
      value: teacher.id,
      label: teacher.user?.name ? `${teacher.user.name} (${teacher.user.email})` : `Teacher #${teacher.id}`,
    })) || [],
    [teachers]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('departments.store'));
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Departments', href: '/departments' }, { title: 'Add Department', href: '/departments/create' }]}>
      <CommonPageLayout
        header={
          <>
            <h2 className="text-2xl font-semibold mb-2 text-left">Add Department</h2>
          </>
        }
      >
        <Head title="Add Department" />
        <div className="w-full max-w-none px-4 md:px-12">
          <form className="w-full flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  disabled={processing}
                  placeholder="Enter department name"
                  autoFocus
                  autoComplete="off"
                />
                <InputError message={errors.name} />
              </div>
              {/* Head Teacher */}
              <div className="grid gap-2">
                <Label htmlFor="head_teacher_id">Head Teacher</Label>
                <select
                  id="head_teacher_id"
                  value={data.head_teacher_id}
                  onChange={e => setData('head_teacher_id', e.target.value)}
                  disabled={processing}
                  className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 px-3 py-2"
                >
                  <option value="">Select head teacher</option>
                  {teacherOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <InputError message={errors.head_teacher_id} />
              </div>
              {/* Description */}
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  disabled={processing}
                  placeholder="Enter description"
                />
                <InputError message={errors.description} />
              </div>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing ? 'Saving...' : 'Add Department'}
              </Button>
            </div>
          </form>
        </div>
      </CommonPageLayout>
    </AppLayout>
  );
} 