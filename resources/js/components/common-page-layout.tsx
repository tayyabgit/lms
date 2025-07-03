import { ReactNode } from 'react';

interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface CommonPageLayoutProps {
    children: ReactNode;
    header?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function CommonPageLayout({ children, header, breadcrumbs }: CommonPageLayoutProps) {
    return (
        <div className="bg-background flex min-h-screen flex-col items-center pt-2">
            <div className="w-full max-w-none px-4 md:px-12">
                {breadcrumbs && (
                    <nav className="text-muted-foreground mb-2 text-sm" aria-label="Breadcrumb">
                        <ol className="flex space-x-2">
                            {breadcrumbs.map((item, idx) => (
                                <li key={idx} className="flex items-center">
                                    {item.href ? (
                                        <a href={item.href} className="hover:underline">
                                            {item.title}
                                        </a>
                                    ) : (
                                        <span className="text-gray-700">{item.title}</span>
                                    )}
                                    {idx < breadcrumbs.length - 1 && <span className="mx-2 text-gray-400">/</span>}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
                {header && <div className="bg-background sticky top-0 z-20 mb-4 pt-4 pb-2">{header}</div>}
                {children}
            </div>
        </div>
    );
}
