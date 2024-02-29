import React from 'react';
import { info } from '../components/Data/info';
import Team from '../components/Team/Team';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function AboutUs() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }


    return (
        <>
            <Link to="/">
                <MdOutlineArrowBackIosNew size={20} style={{ marginLeft: isMobile() ? 10 : 50, marginTop: isMobile() ? 10 : 50 }} />
            </Link>


            <div style={{ width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto" }}>
                {info.aboutUsDescription}
            </div>
        </>
    )
}