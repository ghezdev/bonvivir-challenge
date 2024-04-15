import React from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { arrayRange } from "@/lib/utils";

type Props = {};

export default function Loading({}: Props) {
  const imagesArray = arrayRange(1, 6);
  return (
    <main className="container py-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <section className="w-full lg:w-1/2">
          <Skeleton className="max-w-[200px] sm:max-w-[300px] md:max-w-[500px] h-40 sm:h-80 lg:h-[500px] mx-auto" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 p-4">
              {imagesArray.map((value) => (
                <Skeleton
                  key={`image-skeleton-${value}`}
                  className="h-[150px] w-[150px]"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
        <section className="w-full lg:w-1/2">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 max-w-60 mb-8" />
          <Skeleton className="h-4 w-20 mb-3" />
          <div className="flex gap-4 items-center mb-8">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-4 mb-6">
            <Skeleton className="h-4 max-w-[600px]" />
            <Skeleton className="h-4 max-w-[500px]" />
            <Skeleton className="h-4 max-w-80" />
            <Skeleton className="h-4 max-w-[450px]" />
            <Skeleton className="h-4 max-w-[400px]" />
          </div>
          <Skeleton className="h-10 w-28" />
        </section>
      </div>
      <Separator className="my-8" />
      <Skeleton className="h-6 w-40 mb-6" />
      <div className="space-y-4">
        <Skeleton className="h-4 max-w-[600px]" />
        <Skeleton className="h-4 max-w-[500px]" />
        <Skeleton className="h-4 max-w-80" />
        <Skeleton className="h-4 max-w-[450px]" />
        <Skeleton className="h-4 max-w-[400px]" />
        <Skeleton className="h-4 max-w-[600px]" />
        <Skeleton className="h-4 max-w-[500px]" />
        <Skeleton className="h-4 max-w-80" />
        <Skeleton className="h-4 max-w-[450px]" />
        <Skeleton className="h-4 max-w-[400px]" />
        <Skeleton className="h-4 max-w-[600px]" />
        <Skeleton className="h-4 max-w-[500px]" />
        <Skeleton className="h-4 max-w-80" />
        <Skeleton className="h-4 max-w-[450px]" />
        <Skeleton className="h-4 max-w-[400px]" />
      </div>
    </main>
  );
}

