import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { footerNavItems, mainNavItems } from '@/lib/sidebar-routes';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from './nav-footer';
import { NavUser } from './nav-user';

export function AppSidebar() {
    return (
        <Sidebar className="flex h-screen flex-col">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-y-auto">
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((project) => (
                                <SidebarMenuItem key={project.title} className="group flex items-center justify-between">
                                    <SidebarMenuButton asChild>
                                        <a href={project.mainHref} className="flex flex-1 items-center gap-2">
                                            {project.icon && <project.icon className="h-5 w-5" />}
                                            <span>{project.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    {project.subUrl && (
                                        <Link
                                            href={project.subUrl}
                                            className="ml-2 rounded p-1 hover:bg-gray-100 focus:outline-none"
                                            title={`Add to ${project.title}`}
                                            prefetch
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Link>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-sidebar sticky bottom-0 z-10">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
