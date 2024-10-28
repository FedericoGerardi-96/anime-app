import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getLangFromUrl } from '@/i18n/utils';
import type { IPagination } from '@/interface';

interface Props {
  pagination: IPagination;
}

export function PaginationComponent({ pagination }: Readonly<Props>) {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url) as string;
  const [maxPagesToShow, setMaxPagesToShow] = useState(pagination.items.per_page);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 975 && window.innerWidth >= 760) {
        setMaxPagesToShow(4);
      } else if (window.innerWidth < 760) {
        setMaxPagesToShow(1);
      } else {
        setMaxPagesToShow(pagination.items.per_page / 2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [pagination.items.per_page]);

  const renderPageLinks = () => {
    const pageLinks = [];

    let startPage = Math.max(1, pagination.current_page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pagination.last_visible_page, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageLinks.push(
        <PaginationItem key={page}>
          <PaginationLink href={`/${lang}/anime/season/${page}`} isActive={page === pagination.current_page}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageLinks;
  };

  return (
    <div className='container mx-auto w-full'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${pagination.current_page === 1 && 'pointer-events-none cursor-auto'}`}
              href={`/${lang}/anime/season/${pagination.current_page - 1}`}
            />
          </PaginationItem>
          {renderPageLinks()}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                window.localStorage.setItem('changePagination', `true`);
              }}
              className={`${
                pagination.current_page === pagination.last_visible_page && 'pointer-events-none cursor-auto'
              }`}
              href={`/${lang}/anime/season/${pagination.current_page + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
