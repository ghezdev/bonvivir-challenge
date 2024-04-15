"use client";
import React, { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  decrement,
  getProductById,
  increment,
  removeFromCart,
} from "@/lib/features/cart/cartSlice";
import { Catalog } from "@/interfaces/catalog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

type Props = {
  product: Catalog;
};

export default function AddButton({ product }: Props) {
  const productInCart = useAppSelector(getProductById(product.id));
  const dispatch = useAppDispatch();

  const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productInCart) return;

    if (productInCart.quantity <= 1) {
      dispatch(removeFromCart(productInCart.id));
      return;
    }
    dispatch(decrement(productInCart.id));
  };

  const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (productInCart) dispatch(increment(productInCart.id));
  };

  return (
    <div className="w-32">
      <div
        className={`flex relative ml-1 gap-3 overflow-hidden cursor-auto`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Button
          variant="default"
          className={`flex gap-2 ${
            productInCart ? "-translate-x-40" : "translate-x-0"
          } transition-all`}
          onClick={() => dispatch(addToCart(product))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Agregar
        </Button>

        <div
          className={`flex gap-2 items-center ${
            productInCart ? "-translate-x-32" : "translate-x-0"
          } transition-all`}
        >
          <Button
            variant="default"
            className="p-0 h-fit rounded-full"
            onClick={handleIncrement}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 p-[3px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </Button>
          <span className="text-2xl w-10 text-center">
            {productInCart?.quantity || 0}
          </span>
          <Button
            variant="default"
            className="p-0 h-fit rounded-full"
            onClick={handleDecrement}
            disabled={(productInCart?.quantity || 0) >= product.stock}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 p-[3px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

