import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../components/ui/button";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div className="container">
      <Image
        className="dark:invert transition-all mx-auto mt-12"
        src="/chin.svg"
        alt="Dos copas chocandose entre sí"
        width={200}
        height={200}
      />
      <p className="text-center text-2xl my-8">Ruta no encontrada</p>
      <Link href="/product-list" className="flex justify-center">
        <Button>Ir a la tienda</Button>
      </Link>
    </div>
  );
}

