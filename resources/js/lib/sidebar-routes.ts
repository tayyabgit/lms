import { LayoutGrid, Users, Shapes, UsersRound, Folder, BookOpen, LucideIcon } from 'lucide-react';
import { type NavItem } from '@/types';

export const mainNavItems: (NavItem & { url: string; icon: LucideIcon; subUrl?: string })[] = [
    {
        title: 'Dashboard',
        mainHref: '/dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Teachers',
        mainHref: '/teachers',
        url: '/teachers',
        icon: Users,
        subUrl: '/teachers/create',
    },
    {
        title: 'Departments',
        mainHref: '/departments',
        url: '/departments',
        icon: Shapes,
        subUrl:'departments/create'
    },
    {
        title: 'Students',
        mainHref: '/students',
        url: '/students',
        icon: UsersRound,
        subUrl: '/students/create',
    },
];

export const footerNavItems: (NavItem & { url?: string; icon: LucideIcon })[] = [
    {
        title: 'Repository',
        mainHref: 'https://github.com/laravel/react-starter-kit',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        mainHref: 'https://laravel.com/docs/starter-kits#react',
        url: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
]; 