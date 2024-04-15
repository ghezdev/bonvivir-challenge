"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  idProduct: number;
};

const PRODUCTS_LIKED_KEY = "productsLiked";

export default function LikeButton({ className, idProduct }: Props) {
  const [isProductLiked, setIsProductLiked] = useState(false);

  useEffect(() => {
    const productsLiked =
      localStorage.getItem(PRODUCTS_LIKED_KEY) !== null
        ? JSON.parse(localStorage.getItem(PRODUCTS_LIKED_KEY)!)
        : {};

    setIsProductLiked(productsLiked[idProduct]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const productsLiked =
      localStorage.getItem(PRODUCTS_LIKED_KEY) !== null
        ? JSON.parse(localStorage.getItem(PRODUCTS_LIKED_KEY)!)
        : {};

    if (productsLiked[idProduct]) {
      delete productsLiked[idProduct];
      setIsProductLiked(false);
    } else {
      productsLiked[idProduct] = true;
      setIsProductLiked(true);
    }

    localStorage.setItem(PRODUCTS_LIKED_KEY, JSON.stringify(productsLiked));
  };

  return (
    <Button
      className={cn("absolute top-0 right-0 p-1 h-fit z-10", className)}
      variant="ghost"
      onClick={handleOnClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isProductLiked ? "#C51104" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={isProductLiked ? "#C51104" : "currentColor"}
        className="w-6 h-6 transition-all"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </Button>
  );
}

