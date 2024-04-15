import { Request, Response } from "express";
import catalogService from "../services/catalog.service";

function mapp(query: Request["query"]) {
  const { search, sort, categories, priceRange, page } = query;

  return {
    search: search?.toString(),
    sort: sort === "asc" ? ("asc" as const) : ("desc" as const),
    categories: categories?.toString().split(","),
    priceRange: priceRange
      ?.toString()
      .split("-")
      .map((price) => Number(price)) as [number, number],
    page: Number(page) || 1,
  };
}

async function getAll(req: Request, res: Response) {
  const catalog = await catalogService.getAll(mapp(req.query));

  res.status(200).json(catalog);
}

export default {
  getAll,
};

