import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { info } from '../components/Data/info';
import { MdOutlineArrowBackIosNew } from "react-icons/md";


export default function Atölye() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }

    const [atölyeId, setAtölyeId] = useState(0)
    useEffect(() => {
        const localAtölye = JSON.parse(localStorage.getItem("atölye"));
        // console.log("localoyun: ", localOyun.title)
        if (localAtölye && localAtölye.id)
            setAtölyeId(localAtölye.id)

        localStorage.removeItem("atölye")
    }, [])
    return (
        // <TeamMembers/>
        <>
            <Link to="/">
                <MdOutlineArrowBackIosNew size={20} style={{ marginLeft: isMobile() ? 10 : 50, marginTop: isMobile() ? 10 : 50 }} />
            </Link>
            <div style={{
                width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto"
            }}>

                {atölyeId == 1 ?
                    info.atölyeDescription :
                    atölyeId == 3 ?
                        info.atölyeDescriptionThree :
                        atölyeId == 2 &&
                        info.atölyeDescriptionTwo
                }
                {/* <div  style={{width: "100%", marginLeft: "auto"}}> */}
                {atölyeId == 1 ?
                    <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye1.jpg"} />
                    :
                    <>
                        {atölyeId == 3 ?
                            <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/veysi_ceri.jpg"} />

                            :
                            atölyeId == 2 &&
                            <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye2.jpg"} />

                        }
                    </>
                }
                {atölyeId === 0 &&
                    <>
                        {info.atölyeDescription}
                        <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye1.jpg"} />
                        {info.atölyeDescriptionTwo}
                        <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye2.jpg"} />
                        {info.atölyeDescriptionThree}
                        <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/veysi_ceri.jpg"} />
                    
                    </>
                }

                {/* </div> */}
            </div>
        </>
    )
}