import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PaginationProducts from "./PaginationProducts";
import { CatalogPaginated } from "@/interfaces/catalog";
import Currency from "currency.js";
import Image from "next/image";
import AddButton from "@/components/molecules/AddButton";
import Link from "next/link";
import LikeButton from "@/components/molecules/LikeButton";

type Props = {
  page: number;
  search: string;
  priceRange: string;
  category: string;
  sort: string;
};

async function getCatalog({ page, search, priceRange, category, sort }: Props) {
  let url = "http://localhost:8080/api/product";

  if (page)
    url = url.includes("?") ? url + `page=${page}&` : url + `?page=${page}&`;

  if (search)
    url = url.includes("?")
      ? url + `search=${search}&`
      : url + `?search=${search}&`;

  if (priceRange)
    url = url.includes("?")
      ? url + `priceRange=${priceRange}&`
      : url + `?priceRange=${priceRange}&`;

  if (category)
    url = url.includes("?")
      ? url + `categories=${category}&`
      : url + `?categories=${category}&`;

  if (sort)
    url = url.includes("?") ? url + `sort=${sort}&` : url + `?sort=${sort}&`;

  const catalog: CatalogPaginated = await fetch(url).then((res) => res.json());

  return catalog;
}

export default async function ProductsGrid({
  page,
  search,
  priceRange,
  category,
  sort,
}: Props) {
  const catalogPaginated = await getCatalog({
    page,
    search,
    priceRange,
    category,
    sort,
  });

  if (catalogPaginated.totalProducts === 0) {
    return (
      <>
        <p className="py-4">{catalogPaginated.totalProducts} resultados</p>
        <Image
          className="dark:invert transition-all mx-auto mt-4"
          src="/chin.svg"
          alt="Dos copas chocandose entre sí"
          width={200}
          height={200}
        />
        <p className="text-center text-2xl mt-8">
          No se encontraron productos con los filtros aplicados
        </p>
        <p className="text-center opacity-50 mt-2 text-lg">
          Intente con otros filtros o reiniciélos
        </p>
      </>
    );
  }

  return (
    <>
      <p className="py-4">{catalogPaginated.totalProducts} resultados</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
        {catalogPaginated.catalog.map((product) => (
          <Link
            key={`card-${product.id}-${product.meta_title}`}
            href={`../product-detail/${product.url_key}`}
          >
            <Card className="h-full flex flex-col shadow-none">
              <CardHeader>
                <div className="relative">
                  <LikeButton idProduct={product.id} />
                  <Image
                    className="mx-auto"
                    priority={true}
                    src={product.thumbnail.url}
                    alt={product.meta_title}
                    width={200}
                    height={200}
                  />
                  <p className="absolute bottom-0 right-0 bg-black/10 dark:bg-white/10 py-1 px-2">
                    %{product.price_range.maximum_price.discount.percent_off}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="grow text-center flex flex-col space-y-4">
                <h1 className="grow font-bold">{product.name}</h1>
                <h3 className="text-sm line-through opacity-50">
                  {Currency(
                    product.price_range.maximum_price.regular_price.value
                  ).format()}
                </h3>
                <h2 className="text-3xl">
                  {Currency(
                    product.price_range.maximum_price.final_price.value
                  ).format()}
                </h2>
              </CardContent>
              <CardFooter className="flex justify-center items-end">
                <AddButton product={product} />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <PaginationProducts maxPage={catalogPaginated.maxPage} />
    </>
  );
}

