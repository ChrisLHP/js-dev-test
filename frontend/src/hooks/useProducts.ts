import React, { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json())

const url = 'http://localhost:7775/products';

const useProducts = () => {
    const { data, error } = useSWR([url], fetcher)

    const products = useMemo(() => {
        return {
            products: data,
            loading: !data && !error,
            error: error
        }
    }, [url, data, error])

    return products;
}

export default useProducts;