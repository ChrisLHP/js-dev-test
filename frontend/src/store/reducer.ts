import { Dispatch } from "react";

export type Product = {
    id: number;
    name: string;
    description: string;
    exPrice: number;
    gstPrice: number;
    stock: number;
}

export type CartItem = {
    product: Product,
    count: number
}

type State = {
    cart: CartItem[];
    isLoading?: boolean;
    error?: string;
}

export const initialState = {
    cart: [],
    isLoading: false,
    error: undefined
}

export type Action = {type: 'setCart', payload: CartItem[]} |
    {type: 'incrementItem', payload: number} |
    {type: 'decrementItem', payload: number} |
    {type: 'removeItem', payload: number} |
    {type: 'clearCart'};

export interface IContextType {
    state: State,
    dispatch: Dispatch<Action>
}

const clearCart = () => {
    return {cart: []}
}

const setCart = (cartItems: CartItem[]) => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems))
    return {cart: cartItems}
}

const incrementItem = (state: State, id: number) => {
    var cart = state.cart;
    const itemIndex = cart.findIndex(c => c.product.id === id)
    if(itemIndex !== undefined){
        const item = cart[itemIndex];
        if(item.count < item.product.stock){
            item.count++;
            cart[itemIndex] = item;
        }
    }

    return {cart: cart};
}

const decrementItem = (state: State, id: number) => {
    var cart = state.cart;
    const itemIndex = cart.findIndex(c => c.product.id === id)
    if(itemIndex !== undefined){
        const item = cart[itemIndex];
        if(item.count > 0){
            item.count--;
            cart[itemIndex] = item;
        }
    }

    return {cart: cart};
}

const removeItem = (state: State, id: number) => {
    return {cart: state.cart?.filter(c => c.product.id !== id)};
}

 const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setCart':
            return setCart(action.payload);
        case 'incrementItem':
            return incrementItem(state, action.payload);
        case 'decrementItem':
            return decrementItem(state, action.payload);
        case 'removeItem':
            return removeItem(state, action.payload);
        case 'clearCart':
            return clearCart();
        default:
            return {cart: [], isLoading: false, error: undefined};
    }
 }

 export default reducer;