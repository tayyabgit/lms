import { LayoutGrid, Users, Shapes, UsersRound, Folder, BookOpen, School } from 'lucide-react';
import { type NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Teachers',
        href: '/teachers',
        icon: Users,
    },
    {
        title: 'Departments',
        href: '/departments',
        icon: Shapes,
    },
    {
        title: 'Classes',
        href: '/classes',
        icon: School,
    },
    {
        title: 'Students',
        href: '/students',
        icon: UsersRound,
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
]; 