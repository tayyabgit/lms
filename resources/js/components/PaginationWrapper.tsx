import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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
                                <span className="pointer-events-none px-3 py-2 opacity-50">{link.label}</span>
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            {isPrev ? (
                                <PaginationPrevious href={link.url} size="default" />
                            ) : isNext ? (
                                <PaginationNext href={link.url} size="default" />
                            ) : (
                                <PaginationLink href={link.url} isActive={link.active} size="icon">
                                    {link.label}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
