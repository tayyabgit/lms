import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Link } from '@inertiajs/react';

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface InertiaPaginationProps {
    links: PaginationLinkType[];
}

export default function PaginationWrapper({ links }: InertiaPaginationProps) {
    if (!links || links.length <= 3) return null;

    return (
        <Pagination className="mb-5">
            <PaginationContent>
                {links.map((link, index) => {
                    const isPrev = link.label.includes('Previous') || link.label.includes('«');
                    const isNext = link.label.includes('Next') || link.label.includes('»');

                    if (!link.url) {
                        return (
                            <PaginationItem key={index}>
                                {isPrev ? (
                                    <PaginationPrevious className="pointer-events-none opacity-50" />
                                ) : isNext ? (
                                    <PaginationNext className="pointer-events-none opacity-50" />
                                ) : (
                                    <PaginationLink className="pointer-events-none opacity-50">{link.label}</PaginationLink>
                                )}
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            {isPrev ? (
                                <Link href={link.url} preserveScroll preserveState>
                                    <PaginationPrevious />
                                </Link>
                            ) : isNext ? (
                                <Link href={link.url} preserveScroll preserveState>
                                    <PaginationNext />
                                </Link>
                            ) : (
                                <Link href={link.url} preserveScroll preserveState>
                                    <PaginationLink isActive={link.active}>{link.label}</PaginationLink>
                                </Link>
                            )}
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
