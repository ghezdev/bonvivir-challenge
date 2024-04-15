import { Catalog } from "./catalog";

export type Product = Catalog & {
  quantity: number;
};

