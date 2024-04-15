"use client";
import React, { KeyboardEvent, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "../../lib/utils";

type Props = {
  className?: string;
};

const SEARCH_PARAM = "search";

export default function Search({ className }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParam = searchParams?.get(SEARCH_PARAM)?.toString();

  const [valueSearch, setValueSearch] = useState<string>(searchParam || "");

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(SEARCH_PARAM, term);
    } else {
      params.delete(SEARCH_PARAM);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(valueSearch);
    }
  };
  return (
    <div className={cn("relative", className)}>
      <Input
        className="pr-10"
        type="text"
        name="product-search"
        placeholder="Buscar..."
        onKeyDown={handleKeyPress}
        onChange={(e) => setValueSearch(e.target.value)}
        defaultValue={searchParam}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 absolute right-2 top-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
}

