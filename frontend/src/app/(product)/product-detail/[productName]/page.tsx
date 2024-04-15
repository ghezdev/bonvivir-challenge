import React from "react";
import { CatalogPaginated } from "@/interfaces/catalog";
import { arrayRange } from "@/lib/utils";
import DetailProduct from "./components/DetailProduct";
import { Metadata } from "next";

type Props = {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productName } = params;

  const catalog: CatalogPaginated = await fetch(
    `http://localhost:8080/api/product?search=${productName}`
  ).then((res) => res.json());

  const product = catalog.catalog[0];

  return {
    title: product.name + " | Bonvivir",
    keywords: product.meta_keyword,
    description: product.meta_description,
  };
}

export async function generateStaticParams() {
  const firstCatalog: CatalogPaginated = await fetch(
    "http://localhost:8080/api/product"
  ).then((res) => res.json());

  const { maxPage, page } = firstCatalog;

  const arrayOfPages = arrayRange(page + 1, maxPage);

  const restCatalogs: CatalogPaginated[] = await Promise.all(
    arrayOfPages.map((page) =>
      fetch(`http://localhost:8080/api/product?page=${page}`).then((res) =>
        res.json()
      )
    )
  );

  const catalog = [
    ...firstCatalog.catalog,
    ...restCatalogs.flatMap(({ catalog }) => catalog),
  ];

  return catalog.map(({ url_key }) => ({ productName: url_key }));
}

async function getProduct(productName: string) {
  const catalog: CatalogPaginated = await fetch(
    `http://localhost:8080/api/product?search=${productName}`
  ).then((res) => res.json());

  return catalog.catalog[0];
}

export default async function Page({ params }: Props) {
  const { productName } = params;

  const product = await getProduct(productName);

  return (
    <main className="container py-4">
      <DetailProduct product={product} />
    </main>
  );
}

