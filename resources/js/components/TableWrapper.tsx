import { type HTMLAttributes, type ReactNode } from 'react';

export default function TableWrapper({ children, ...divProps }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="mb-5 overflow-x-auto rounded-xl border" {...divProps}>
            {children}
        </div>
    );
}
