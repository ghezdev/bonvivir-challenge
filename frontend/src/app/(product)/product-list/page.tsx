import React, { Suspense } from "react";
import Filters from "./components/Filters";
import ProductsGrid from "./components/ProductsGrid";
import ProductsGridSkeleton from "./components/ProductsGridSkeleton";
import { Metadata } from "next";

type Props = {
  searchParams?: {
    search?: string;
    priceRange?: string;
    page?: string;
    category?: string;
    sort: string;
  };
};

export const metadata: Metadata = {
  title: "Tienda | Bonvivir",
  description: "Catálogo de vinos",
};

export default async function Page({ searchParams }: Props) {
  const searchParam = searchParams?.search || "";
  const priceRangeParam = searchParams?.priceRange || "";
  const categoryParam = searchParams?.category || "";
  const sortParam = searchParams?.sort || "";
  const pageParam = Number(searchParams?.page) || 0;

  return (
    <main className="container flex gap-8">
      <aside className="hidden md:inline-block w-80">
        <p className="py-4">Filtrar por</p>
        <Filters />
      </aside>
      <section className="w-full">
        <Filters isMobile className="inline-block md:hidden mt-4" />
        <Suspense
          key={
            searchParam +
            priceRangeParam +
            categoryParam +
            sortParam +
            pageParam
          }
          fallback={<ProductsGridSkeleton />}
        >
          <ProductsGrid
            page={pageParam}
            search={searchParam}
            priceRange={priceRangeParam}
            sort={sortParam}
            category={categoryParam}
          />
        </Suspense>
      </section>
    </main>
  );
}

