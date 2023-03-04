import React from 'react';
import { info } from '../components/Data/info';
import Team from '../components/Team/Team';

export default function Atölye() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }

    return (
        // <TeamMembers/>
        <>
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