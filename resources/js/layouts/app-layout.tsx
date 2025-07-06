import CommonPageLayout from '@/components/common-page-layout';
import { Button } from '@/components/ui/button';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    btnText?: string;
    btnLink?: string;
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const pageProps = usePage().props;

    // Get flash messages from the shared props
    const flash = (pageProps as { flash?: { success?: string; error?: string } }).flash;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <CommonPageLayout
                header={
                    <div className="flex justify-between">
                        <h2 className="pt-1 text-left text-lg font-semibold">{props.title}</h2>
                        {props.btnText && props.btnLink && (
                            <Link href={props.btnLink}>
                                <Button>{props.btnText}</Button>
                            </Link>
                        )}
                    </div>
                }
            >
                {children}
            </CommonPageLayout>
        </AppLayoutTemplate>
    );
};
