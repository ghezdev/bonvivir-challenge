"use client";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  className?: string;
  isMobile?: boolean;
};

const PRINCE_RANGE_PARAM = "priceRange";
const CATEGORY_PARAM = "categories";
const SORT_PARAM = "sort";

const categories = [
  {
    value: "vinos",
    label: "Vinos",
  },
  {
    value: "tienda-sale",
    label: "Tienda Sale",
  },
];

export default function Filters({ className, isMobile }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const priceRangeParam = searchParams?.get(PRINCE_RANGE_PARAM)?.toString();
  const categoriesParam = searchParams?.get(CATEGORY_PARAM)?.toString();
  const sortParam = searchParams?.get(SORT_PARAM)?.toString();

  const [minPriceParam, maxPriceParam] = priceRangeParam
    ? priceRangeParam.split("-")
    : ["", ""];

  const [valueMinPrice, setValueMinPrice] = useState<string>(
    minPriceParam || ""
  );
  const [valueMaxPrice, setValueMaxPrice] = useState<string>(
    maxPriceParam || ""
  );

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(PRINCE_RANGE_PARAM, term);
    } else {
      params.delete(PRINCE_RANGE_PARAM);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleOnCheckedCategory =
    (category: string) => (checked: CheckedState) => {
      const params = new URLSearchParams(searchParams);

      if (checked) {
        if (Boolean(categoriesParam?.includes(category))) return;

        if (categoriesParam) {
          const categoriesParsed = categoriesParam.split(",");
          const newCategories = [...categoriesParsed, category].join(",");
          params.set(CATEGORY_PARAM, newCategories);
        } else {
          params.set(CATEGORY_PARAM, category);
        }

        replace(`${pathname}?${params.toString()}`);
      } else {
        if (Boolean(!categoriesParam?.includes(category))) return;

        if (categoriesParam) {
          const categoriesParsed = categoriesParam.split(",");

          if (
            categoriesParam.includes(category) &&
            categoriesParsed.length === 1
          ) {
            params.delete(CATEGORY_PARAM);
          } else {
            const newCategories = categoriesParsed
              .filter((categoryParsed) => categoryParsed !== category)
              .join(",");
            params.set(CATEGORY_PARAM, newCategories);
          }
        }
      }

      replace(`${pathname}?${params.toString()}`);
    };

  const handleKeyPress =
    (minValue: string, maxValue: string) =>
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        let term = "";

        if (minValue && !maxValue) term = `${minValue}-${minValue}`;

        if (maxValue && !minValue) term = `0-${maxValue}`;

        if (minValue && maxValue) term = `${minValue}-${maxValue}`;

        handleSearch(term);
      }
    };

  const handleOnValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(SORT_PARAM, value);

    replace(`${pathname}?${params.toString()}`);
  };

  if (isMobile) {
    return (
      <div className={className}>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex gap-2">
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
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>{" "}
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <p>Precio</p>
              <div className="flex gap-4 text-center text-xs">
                <div className="space-y-1">
                  <Input
                    type="text"
                    name="min-price"
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setValueMinPrice(e.target.value);
                      }
                    }}
                    defaultValue={valueMinPrice}
                    onKeyDown={handleKeyPress(
                      valueMinPrice,
                      valueMaxPrice || valueMinPrice
                    )}
                  />
                  <p>Mínimo</p>
                </div>
                <div className="space-y-1">
                  <Input
                    type="text"
                    name="max-price"
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setValueMaxPrice(e.target.value);
                      }
                    }}
                    defaultValue={valueMaxPrice || valueMinPrice}
                    onKeyDown={handleKeyPress(
                      valueMinPrice,
                      valueMaxPrice || valueMinPrice
                    )}
                  />
                  <p>Máximo</p>
                </div>
              </div>
              <Separator className="my-4" />
              <p>Ordenar por</p>
              <RadioGroup
                defaultValue={sortParam || undefined}
                className="space-y-2"
                onValueChange={handleOnValueChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asc" id="asc" />
                  <Label htmlFor="asc">Precio más bajo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="desc" id="desc" />
                  <Label htmlFor="desc">Precio más alto</Label>
                </div>
              </RadioGroup>
              <Separator className="my-4" />
              <p>Categorías</p>
              <div className="space-y-3">
                {categories.map(({ label, value }) => (
                  <div
                    key={`checkbox-${value}`}
                    className="flex gap-2 items-end"
                  >
                    <Checkbox
                      id={value}
                      defaultChecked={categoriesParam?.includes(value) || false}
                      onCheckedChange={handleOnCheckedCategory(value)}
                    />
                    <Label htmlFor={value}>{label}</Label>
                  </div>
                ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="py-6 space-y-4">
        <p>Precio</p>
        <div className="flex gap-4 text-center text-xs">
          <div className="space-y-1">
            <Input
              type="text"
              name="min-price"
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value)) {
                  setValueMinPrice(e.target.value);
                }
              }}
              defaultValue={valueMinPrice}
              onKeyDown={handleKeyPress(
                valueMinPrice,
                valueMaxPrice || valueMinPrice
              )}
            />
            <p>Mínimo</p>
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              name="max-price"
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value)) {
                  setValueMaxPrice(e.target.value);
                }
              }}
              defaultValue={valueMaxPrice || valueMinPrice}
              onKeyDown={handleKeyPress(
                valueMinPrice,
                valueMaxPrice || valueMinPrice
              )}
            />
            <p>Máximo</p>
          </div>
        </div>
        <Separator className="my-4" />
        <p>Ordenar por</p>
        <RadioGroup
          defaultValue={sortParam || undefined}
          className="space-y-2"
          onValueChange={handleOnValueChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="asc" id="asc" />
            <Label htmlFor="asc">Precio más bajo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="desc" id="desc" />
            <Label htmlFor="desc">Precio más alto</Label>
          </div>
        </RadioGroup>
        <Separator className="my-4" />
        <p>Categorías</p>
        <div className="space-y-3">
          {categories.map(({ label, value }) => (
            <div key={`checkbox-${value}`} className="flex gap-2 items-end">
              <Checkbox
                id={value}
                defaultChecked={categoriesParam?.includes(value) || false}
                onCheckedChange={handleOnCheckedCategory(value)}
              />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

