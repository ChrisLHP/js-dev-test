import { FC, useContext, useEffect, useMemo, useReducer } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom";
import { FaSquareFull } from 'react-icons/fa';
import { BiPyramid } from 'react-icons/bi';
import { BsOctagonFill, BsDot } from 'react-icons/bs';
import { GiLightningHelix, GiCube } from 'react-icons/gi';
import { CgShapeRhombus } from 'react-icons/cg';
import { AiFillWarning, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { ImSphere } from 'react-icons/im';
import reducer, { CartItem, initialState, Product } from "../store/reducer";
import { ShopContext } from "../contexts/ShopContext";

const iconSize = 72;

const getIconByName = (name: string) => {
    switch (name){
        case "Cube":
        return <GiCube size={iconSize}/>;
        case "Sphere":
            return <ImSphere size={iconSize}/>;
        case "Square":
            return <FaSquareFull size={iconSize}/>;
        case "Pyramid":
            return <BiPyramid size={iconSize} />;
        case "Dodecodehron":
            return <BsOctagonFill size={iconSize} />;
        case "Spiral":
            return <GiLightningHelix size={iconSize} />;
        case "Plane":
            return <CgShapeRhombus size={iconSize} />;
        case "Point":
            return <BsDot size={iconSize} />;
        default: 
            return <AiFillWarning size={iconSize} />;
    }
}
interface IProductCardProps {
    product: Product,
    cartPage?: boolean
}

const ProductCard: FC<IProductCardProps> = ({product, cartPage}) => {

    const context = useContext(ShopContext);

    const handleClick = () => {

        if(context && !cartPage){
            if(context.state.cart.findIndex(p => p?.product?.id === product.id) === -1){
                const count: number = 1;
                context.dispatch({type: 'setCart', payload: [...context.state.cart, {product, count}]});
            }
            else{
                context.dispatch({type: 'setCart', payload: [...context.state.cart.filter(p => p?.product?.id !== product.id)]});
            }
        }
        
    }

    const handleIncrement = () => {
        if(context){
            context.dispatch({type: 'incrementItem', payload: product.id})
        }
    }

    const handleDecrement = () => {
        if(context){
            context.dispatch({type: 'decrementItem', payload: product.id})
        }
    }

    const handleRemove = () => {
        if(context){
            context.dispatch({type: 'removeItem', payload: product.id})
        }
    }

    const isSelected: boolean = useMemo(() => {
        return context.state.cart.findIndex(p => p.product?.id === product?.id) !== -1
    }, [context, context.state.cart, product]);

    const productCount = useMemo(() => {
        return context.state.cart.find(c => c.product?.id === product?.id)?.count;
    }, [product, context, context.state.cart])

    const iconClass = isSelected && !cartPage ? 'text-blue-400' : 'text-black'
    const borderClass = isSelected && !cartPage ? 'border-4' : 'border'

    const incClass = productCount && productCount >= product.stock ? "hover:cursor-not-allowed text-gray-200" : "hover:border-blue-400 hover:cursor-pointer"
    const decClass = !productCount ||  productCount === 0 ? " hover:cursor-not-allowed text-gray-200" : "hover:border-blue-400 hover:cursor-pointer"

    const cardClass = cartPage ? '' : ' hover:cursor-pointer' 


    return <div>
        <div 
            className={`mb-2 w-48 p-3 ${borderClass} border-blue-400 rounded-md flex flex-col justify-center hover:text-blue-400 ${cardClass}`}
            onClick={handleClick}
        >
            <div className={`flex justify-center ${iconClass}`}>
                {getIconByName(product?.name ?? "")}
            </div>
            <div className="p1 flex justify-center text-2xl mt-5 text-black">
                {product?.name}
            </div>
            <div className="p1 flex justify-center text-2xl mt-5 text-black">
                {`$${product?.gstPrice?.toFixed(2)}`}
            </div>
        </div>
        {
            cartPage && ( 
                <div className="flex flex-col align-center w-full">
                    <div className="flex justify-around w-full">
                        <div 
                            onClick={handleDecrement}
                            className={`border-solid border-2 p-1 ${decClass}`}
                        >
                            <AiOutlineMinus />
                        </div>
                        <div>
                            {productCount ?? 0}
                        </div>
                        <div 
                            onClick={handleIncrement}
                            className={`border-solid border-2 p-1 ${incClass}`}
                        >
                            <AiOutlinePlus />
                        </div>
                    </div>
                    {
                        (!productCount || productCount === 0) && (
                            <div className="text-center hover:cursor-pointer hover:text-blue-400" onClick={handleRemove}>
                                Remove Item
                            </div>
                        ) 
                    }
                </div>
            )
        }
    </div>
        
        
}

export default ProductCard