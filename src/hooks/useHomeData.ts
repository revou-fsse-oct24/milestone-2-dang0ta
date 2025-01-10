import { type Category } from "@models/category";
import { type Product } from "@models/product";
import { type Response } from "@actions/api";

import { getProducts } from "@actions/product";
import { getCategories } from "@actions/category";
import { parseError } from "@actions/exceptions";
import { useCallback, useEffect, useState } from "react";

type HomeData = {
  products: Product[];
  categories: Category[];
  error?: string;
  loading: boolean;
};

export const useHomeData = () => {
  const [data, setData] = useState<HomeData>({
    products: [],
    categories: [],
    error: "",
    loading: false,
  });

  const fetchData = useCallback(async () => {
    setData({
      ...data,
      loading: true,
    });
    try {
      const promises: [
        Promise<Response<Category[]>>,
        Promise<Response<Product[]>>
      ] = [getCategories(), getProducts({})];
      const [categoriesRes, productsRes] = await Promise.all(promises);
      if (categoriesRes.status === "error") {
        throw new Error(categoriesRes.error);
      }

      if (productsRes.status === "error") {
        throw new Error(productsRes.error);
      }

      setData({
        ...data,
        loading: false,
        products: productsRes.data,
        categories: categoriesRes.data,
      });
    } catch (e) {
      const parsedErr = parseError(e);
      setData({
        ...data,
        loading: false,
        error: parsedErr.message,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return {
    data,
  };
};
