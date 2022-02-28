
import { ReactElement, ReactFragment } from 'react';
import { FaSquareFull } from 'react-icons/fa';
import { BsTriangleFill, BsFillOctagonFill, BsDot } from 'react-icons/bs';
import { GiLightningHelix } from 'react-icons/gi';
import { CgShapeRhombus } from 'react-icons/cg';
import { AiFillWarning } from 'react-icons/ai';

const getIconByName = (name: string) => {
    switch (name){
        case "Square":
            return <FaSquareFull />;
        case "Pyramid":
            return <BsTriangleFill />;
        case "Dodecohedron":
            return <BsFillOctagonFill />;
        case "Spiral":
            return <GiLightningHelix />;
        case "Plan":
            return <CgShapeRhombus />;
        case "Point":
            return <BsDot />;
        default: 
            return <AiFillWarning />;
    }
}

export default getIconByName;