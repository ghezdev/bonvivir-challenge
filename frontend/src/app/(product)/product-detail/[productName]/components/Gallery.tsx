"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Catalog } from "@/interfaces/catalog";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/molecules/LikeButton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  images: Catalog["media_gallery"];
  idProduct: number;
};

export default function Gallery({ images, idProduct }: Props) {
  const [imageSelected, setImageSelected] = useState(images[0]);

  return (
    <section className="w-full lg:w-1/2">
      <div className="relative">
        <LikeButton className="top-2 right-2" idProduct={idProduct} />
        <Image
          priority={true}
          src={imageSelected.url}
          alt={imageSelected.label || ""}
          width={500}
          height={400}
          className="mx-auto p-4"
        />
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4">
          {images.map((image, index) => (
            <Button
              key={`image-preview-${index}`}
              variant="ghost"
              className="w-fit h-fit"
              onMouseEnter={() => setImageSelected(image)}
            >
              <Image
                priority={true}
                src={image.url}
                alt={image.label || ""}
                width={150}
                height={100}
              />
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

