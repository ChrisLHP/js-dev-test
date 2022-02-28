import { Link } from "react-router-dom";

const About = () => {
    return <div className="flex flex-col items-center">
        <div className="text-3xl my-5">
            <h1>This is the about page</h1>
        </div>
        <div>
            <Link to="/" className="p-3 bg-blue-400 w-24 h-10 text-white font-semibold rounded mt-4">
                Home
            </Link>
        </div>
    </div>
}

export default About;