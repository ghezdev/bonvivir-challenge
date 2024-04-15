import { axiosInstance } from "../config";
import { Catalog } from "../interfaces/catalog";
import catalogMock from "../mocks/catalog.json";

type Params = {
  search: string;
  sort: "asc" | "desc";
  categories: string[];
  priceRange: [number, number];
  page: number;
};

const getIndexSlice = (page: number | undefined, increment = 0) =>
  ((page || 0) + increment) * 6;

async function getAll({
  search,
  sort,
  categories,
  priceRange,
  page,
}: Partial<Params>) {
  let catalog: Catalog[];

  try {
    const { data } = await axiosInstance.get<Catalog[]>("/test-ecomm/catalog");

    catalog = data;
  } catch (error) {
    catalog = catalogMock as unknown as Catalog[];
  }

  let listCatalog = [...catalog, ...catalog, ...catalog, ...catalog].map(
    (product, index) => ({
      ...product,
      id: index,
      url_key: product.url_key.concat(`-${index}`),
      name: product.name.concat(`-${index}`),
    })
  );

  if (search) {
    const searchParsed = search.toLowerCase();
    listCatalog = listCatalog.filter(
      (product) =>
        product.name.toLowerCase().includes(searchParsed) ||
        product.description.html.toLowerCase().includes(searchParsed) ||
        product.url_key.toLowerCase().includes(searchParsed)
    );
  }

  if (sort) {
    const sorterPrice = {
      asc: (catalog: Catalog[]) =>
        catalog.sort(
          (a, b) =>
            a.price_range.maximum_price.final_price.value -
            b.price_range.maximum_price.final_price.value
        ),
      desc: (catalog: Catalog[]) =>
        catalog.sort(
          (a, b) =>
            b.price_range.maximum_price.final_price.value -
            a.price_range.maximum_price.final_price.value
        ),
    };

    listCatalog = sorterPrice[sort](listCatalog) || listCatalog;
  }

  if (categories && categories.length > 0) {
    const categoriesParsed = categories.map((category) =>
      category.toLowerCase()
    );
    listCatalog = listCatalog.filter((product) =>
      product.categories.some(({ name }) =>
        categoriesParsed.includes(name.toLowerCase().replaceAll(" ", "-"))
      )
    );
  }

  if (priceRange && priceRange.length > 0) {
    const [minPrice, maxPrice] = priceRange;
    listCatalog = listCatalog.filter(
      (product) =>
        minPrice >= product.price_range.maximum_price.final_price.value &&
        product.price_range.maximum_price.final_price.value <= maxPrice
    );
  }

  const indexPage = page ? page - 1 : 0;

  const catalogPaginated = listCatalog.slice(
    getIndexSlice(indexPage),
    getIndexSlice(indexPage, 1)
  );

  const maxPage = Math.ceil(listCatalog.length / 6);

  return {
    totalProducts: listCatalog.length,
    page,
    maxPage,
    catalog: catalogPaginated,
  };
}

export default {
  getAll,
};

