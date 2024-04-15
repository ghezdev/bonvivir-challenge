"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  return (
    <>
      <div className="bg-black/10 dark:bg-white/10 py-4">
        <Breadcrumb className="container">
          <BreadcrumbList>
            <BreadcrumbItem>
              {pathname.includes("product-list") ? (
                <BreadcrumbPage>Tienda</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="/product-list">Tienda</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {pathname.includes("product-detail") && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {pathname.split("/").at(-1)?.replaceAll("-", " ")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </>
  );
}

