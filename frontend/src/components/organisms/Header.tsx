"use client";

import React, { Suspense } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/hooks/redux";
import {
  clearCart,
  getProductsParsedInArray,
  getTotalQuantity,
} from "@/lib/features/cart/cartSlice";
import Image from "next/image";
import Currency from "currency.js";
import { useDispatch } from "react-redux";
import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";
import Navbar from "./Navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Search from "../molecules/Search";

type Props = {};

export default function Header({}: Props) {
  const totalQuantityCart = useAppSelector(getTotalQuantity);
  const cart = useAppSelector(getProductsParsedInArray);
  const dispatch = useDispatch();
  const { setTheme, theme } = useTheme();

  return (
    <header className="w-full h-fit">
      <Separator className="hidden sm:inline-block z-10 w-full absolute my-4 top-12" />

      <section className="container py-3">
        <div className="flex justify-between items-center mb-2 sm:mb-0">
          <Image
            className="flex self-start mr-4 w-20 my-auto sm:mt-0 sm:w-36"
            src="/bonvivir-logo.svg"
            alt="Bonvivir logo"
            width={150}
            height={100}
          />
          <div className="hidden sm:inline-block min-w-[100px] w-full max-w-[480px] flex-col relative">
            <Suspense>
              <Search />
            </Suspense>
            <Navbar />
          </div>
          <div className="self-start min-w-fit">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="inline-block sm:hidden px-2 h-full ml-2 self-start min-w-fit"
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
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navegación</SheetTitle>
                  <Navbar isMobile />
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              className="px-2 h-full rounded-full mx-2"
              onClick={() => {
                localStorage.setItem("theme", String(theme));
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              <svg
                id="sun-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>

              <svg
                id="moon-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2 relative">
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
                  {totalQuantityCart > 0 && (
                    <span className="absolute top-0 right-0 text-xs font-bold bg-red-500 dark:bg-red-600 rounded-full px-1">
                      {totalQuantityCart}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              {totalQuantityCart > 0 && (
                <DropdownMenuContent className="p-4 w-screen max-w-[500px]">
                  <Button
                    variant="ghost"
                    className="flex gap-2 px-2"
                    onClick={() => dispatch(clearCart())}
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Clear selection
                  </Button>
                  {cart.map((item) => (
                    <div key={`item-cart-${item.meta_title}`}>
                      <Separator className="my-4" />
                      <div className="flex gap-4">
                        <Image
                          src={item.thumbnail.url}
                          alt={item.meta_title}
                          width={100}
                          height={100}
                        />
                        <div>
                          <p className="text-wrap font-bold">{item.name}</p>
                          <div className="flex gap-4 items-center">
                            <p>
                              {Currency(
                                item.price_range.maximum_price.final_price.value
                              ).format()}
                            </p>
                            <p className="text-xs opacity-50 line-through">
                              {Currency(
                                item.price_range.maximum_price.regular_price
                                  .value
                              ).format()}
                            </p>
                          </div>
                          <p>{`${item.quantity} ${
                            item.quantity === 1 ? "unidad" : "unidades"
                          }`}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="default" className="flex mt-8 w-full gap-2">
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
                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                      />
                    </svg>
                    Comprar
                  </Button>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>

        <Suspense>
          <Search className="inline-block sm:hidden w-full" />
        </Suspense>
      </section>
    </header>
  );
}

