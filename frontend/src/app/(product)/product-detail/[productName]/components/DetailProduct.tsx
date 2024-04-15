"use client";
import React from "react";
import Currency from "currency.js";
import sanitizeHtml from "sanitize-html";
import { Catalog } from "@/interfaces/catalog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  decrement,
  getProductById,
  increment,
  removeFromCart,
} from "@/lib/features/cart/cartSlice";
import AddButton from "@/components/molecules/AddButton";
import Gallery from "./Gallery";
import { Separator } from "@/components/ui/separator";

type Props = {
  product: Catalog;
};

export default function DetailProduct({ product }: Props) {
  const productInCart = useAppSelector(getProductById(product.id));
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <Gallery images={product.media_gallery} idProduct={product.id} />
        <section className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-6">{product.name}</h1>
          <p className="text-gray-500 line-through">
            {Currency(
              product.price_range.maximum_price.regular_price.value
            ).format()}
          </p>
          <div className="flex gap-2 items-center mb-6">
            <h2 className="text-4xl">
              {Currency(
                product.price_range.maximum_price.final_price.value
              ).format()}
            </h2>
            <span className="text-green-500 font-bold">
              {product.price_range.maximum_price.discount.percent_off}% OFF
            </span>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(product.contenido),
            }}
          />

          {productInCart ? (
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                className="p-0 h-fit rounded-full border-2"
                onClick={() => {
                  if (productInCart.quantity <= 1) {
                    dispatch(removeFromCart(productInCart.id));
                    return;
                  }
                  dispatch(decrement(productInCart.id));
                }}
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
                    d="M5 12h14"
                  />
                </svg>
              </Button>
              <span className="text-2xl w-10 text-center">
                {productInCart.quantity}
              </span>
              <Button
                variant="ghost"
                className="p-0 h-fit rounded-full border-2"
                onClick={() => dispatch(increment(productInCart.id))}
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
          ) : (
            <AddButton product={product} />
          )}
        </section>
      </div>
      <Separator className="my-8" />
      <h3 className="text-2xl mb-4 font-bold">Descripción</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(product.description.html),
        }}
      />
    </>
  );
}

