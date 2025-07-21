import { LayoutGrid, Users, Shapes, UsersRound, Folder, BookOpen, LucideIcon, School } from 'lucide-react';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

export const mainNavItems: (NavItem & { icon: LucideIcon; subUrl?: string })[] = [
    {
        title: 'Dashboard',
        mainHref: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Teachers',
        mainHref: '/teachers',
        icon: Users,
        subUrl: '/teachers/create',
    },
    {
        title: 'Departments',
        mainHref: '/departments',
        icon: Shapes,
        subUrl:'/departments/create'
    },
    {
        title: 'Classes',
        mainHref: '/classes',
        icon: School,
        subUrl:'/classes/create'
    },
    {
        title: 'Students',
        mainHref: '/students',
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