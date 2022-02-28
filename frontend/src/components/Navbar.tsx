import { FC } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom";


const Navebar: FC = () => {

    const {pathname} = useLocation();

    const activeLink = "text-pink-600 hover:text-pink-900";
    const link = "text-white hover:text-pink-900"

    return <div className="w-full bg-blue-400 flex justify-end space-x-6 px-10 text-lg">
        <div className="py-3">
            <Link to="/" className={pathname === "/" ? activeLink : link}>
                Home
            </Link>
        </div>
        <div className="py-3">
            <Link to="/Cart" className={pathname === "/Cart" ? activeLink : link}>
                Cart
            </Link>
        </div>
        <div className="py-3">
            <Link to="/About" className={pathname === "/About" ? activeLink : link}>
                About
            </Link>
        </div>
    </div>
}

export default Navebar