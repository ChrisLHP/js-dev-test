import React, { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import {ShopContext} from "../contexts/ShopContext";

const fetcher = (url: string) => fetch(url).then(res => res.json())

const useCosts = () => {
    
    const context = useContext(ShopContext);
    const [exCost, setExCost] = useState<number>();
    const [gstCost, setGstCost] = useState<number>();
    const [totalCost, setTotalCost] = useState<number>();

    useEffect(() => {
        let totalExCostCents: number;
        let totalGstCostCents: number;
        if(context){
            totalExCostCents = context.state.cart.reduce((acc, cur) => acc + (cur.product.exPrice * 100 * cur.count), 0)
            setExCost(totalExCostCents/100);
            totalGstCostCents = context.state.cart.reduce((acc, cur) => acc + (cur.product.gstPrice * 100 * cur.count), 0)
            setGstCost((totalGstCostCents - totalExCostCents) / 100);
            setTotalCost(totalGstCostCents/100);
        }
    }, [context, context?.state?.cart])

    const costs = useMemo(() => {
        return {
            exCost: exCost,
            gstCost: gstCost,
            totalCost: totalCost
        }
    }, [exCost, gstCost, totalCost])

    return costs;
}

export default useCosts;