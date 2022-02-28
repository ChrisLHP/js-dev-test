import { createContext, FC, useEffect, useReducer } from "react";
import reducer, { IContextType, initialState } from "../store/reducer";


export const ShopContext = createContext<IContextType>({
    state: initialState,
    dispatch: () => null
})

const ShopProvider: FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {
        const cartStorage = sessionStorage.getItem("cart");
        if(cartStorage)
        {
            const cart = JSON.parse(cartStorage);
            dispatch({type: 'setCart', payload: cart});
        }
        
    }, [])

    return <ShopContext.Provider value={{ state, dispatch }}>
        {children}
    </ShopContext.Provider>
}

export default ShopProvider;