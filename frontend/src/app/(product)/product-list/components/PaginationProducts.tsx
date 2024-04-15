"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { arrayRange } from "@/lib/utils";

type Props = {
  maxPage: number | string;
};

export default function PaginationProducts({ maxPage }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="pb-8">
      <PaginationContent>
        {currentPage - 1 > 0 && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        )}
        {currentPage - 2 >= 2 && (
          <PaginationItem>
            <PaginationLink href={createPageURL(1)}>1</PaginationLink>
          </PaginationItem>
        )}
        {currentPage - 2 > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {arrayRange(
          currentPage - 2 > 0 ? currentPage - 2 : 1,
          currentPage + 2 < Number(maxPage) ? currentPage + 2 : Number(maxPage)
        ).map((value) => (
          <PaginationItem key={`pagination-item-${value}`}>
            <PaginationLink href={createPageURL(value)}>{value}</PaginationLink>
          </PaginationItem>
        ))}
        {currentPage + 2 < Number(maxPage) - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage + 2 < Number(maxPage) && (
          <PaginationItem>
            <PaginationLink href={createPageURL(maxPage)}>
              {maxPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < Number(maxPage) && (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
