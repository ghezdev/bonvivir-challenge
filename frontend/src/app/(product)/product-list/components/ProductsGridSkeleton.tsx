"use client";
import React from "react";
import { arrayRange } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {};

export default function ProductsGridSkeleton({}: Props) {
  const array = arrayRange(1, 6);
  return (
    <>
      <Skeleton className="h-4 w-28 my-5" />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
        {array.map((value) => (
          <Card key={`card-${value}`}>
            <CardHeader>
              <Skeleton className="w-full h-[200px]" />
            </CardHeader>
            <CardContent className="grow flex flex-col items-center space-y-6">
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-40" />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Skeleton className="h-8 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

