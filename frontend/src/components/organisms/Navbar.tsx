"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  isMobile?: boolean;
};

const routes = [
  { path: "home", text: "Home" },
  { path: "nosotros", text: "Nosotros" },
  { path: "product-list", text: "Tienda" },
  { path: "contact", text: "Contacto" },
];

export default function Navbar({ className, isMobile }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        isMobile ? "flex flex-col gap-4 py-4" : "flex justify-center pt-8 pb-2",
        className
      )}
    >
      {routes.map(({ path, text }, index) => (
        <div key={`nav-${path}`} className="flex items-center">
          <Link
            className={cn(
              `text-sm hover:font-bold ${
                pathname.includes(path) && "font-bold"
              }`,
              isMobile && "w-full"
            )}
            href={`/${path}`}
          >
            {text}
          </Link>
          {!isMobile && index < routes.length - 1 && (
            <div className="w-[1px] bg-black dark:bg-white mx-6 h-3.5" />
          )}
        </div>
      ))}
    </nav>
  );
}

