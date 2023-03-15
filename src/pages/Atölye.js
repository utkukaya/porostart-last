import React from 'react';
import { Link } from 'react-router-dom';
import { info } from '../components/Data/info';
import { MdOutlineArrowBackIosNew } from "react-icons/md";


export default function Atölye() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }

    return (
        // <TeamMembers/>
        <>
            <Link to="/">
                <MdOutlineArrowBackIosNew size={20} style={{ marginLeft: isMobile() ? 10 : 50, marginTop: isMobile() ? 10 : 50 }} />
            </Link>
            <div style={{
                width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto"
            }}>
                {info.atölyeDescription}
                {/* <div  style={{width: "100%", marginLeft: "auto"}}> */}
                <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/poros_atolye_erdogan.jpg"} />
                {/* </div> */}
            </div>
        </>
    )
}