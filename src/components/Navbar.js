import React, { useEffect } from 'react';
import "./Navbar.css"
import { SocialIcon } from 'react-social-icons';
import icon from "./icon";
import { BrowserRouter, Link } from 'react-router-dom';
import "./component-style/media-queries.css";
import {
  MDBBtn
}
  from 'mdb-react-ui-kit';

const Navbar = () => {
  const isMobile = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return width < height;
  }
  const social = [
    {
      name: "instagram",
      url: "https://instagram.com/porosarttiyatro?igshid=NTdlMDg3MTY=",
      className: "fa fa-instagram"
    },
    {
      name: "twitter",
      url: "https://twitter.com/PorosArt",
      className: "fa fa-twitter"
    },
    {
      name: "spotify",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
      className: "fa fa-spotify"
    },
    {
      name: "youtube",
      url: "https://www.youtube.com/@porosart",
      className: "fa fa-youtube"
    },
    {
      name: "whatsapp",
      url: "https://wa.me/+905365802919",
      className: "fa fa-whatsapp"
    }
  ]

  const networks = social.map(function (network) {
    return (
      <SocialIcon size={20} url={network.url} bgColor={"white"} style={{ marginLeft: "50px", height: isMobile() ? 20 : 35, width: isMobile() ? 20 : 35 }} />

    );
  });
  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-50, 50],
    alpha: [0.6, 0],
    scale: [.1, 0.9],
    body: icon,
    position: "all",
    //color: ["random", "#ff0000"],
    cross: "dead",
    random: 10
  };
  return (
    <header className='header'>
      {/* <ParticlesBg config={config} type="custom" bg={true} /> */}

      <div className="videoContainer" style={{ zIndex: -1 }}>
        <div className="videoPlacer">
          <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden" }}>
            <video autoPlay loop muted playsInline width={"100%"}>
              <source src={isMobile() ? "images/dikeyVideo.mp4" : "images/backgroundVideo.mp4"} />
            </video>
          </div>

        </div>
      </div>
      <nav id="nav-wrap" style={{ zIndex: 120000 }}>
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          {/* Show navigation */}
          <div className="line" style={{ width: "60%", borderBottom: "4px solid white", marginTop: "47.5%", marginLeft: "25%", position: "absolute" }}></div>
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          <div className="line" style={{ width: "60%", borderBottom: "4px solid white", marginTop: "47.5%", marginLeft: "25%", position: "absolute" }}></div>

          {/* Hide navigation */}
        </a>

        <ul id="nav" className="nav">
          <li className="current" style={{ fontFamily: "Inter-Bold" }}>
            <Link to="/hakkımızda">HAKKIMIZDA</Link>
          </li>
          <li style={{ fontFamily: "Inter-Bold" }}>
            <Link to="/ekip">EKİP</Link>
          </li>

          <li style={{ fontFamily: "Inter-Bold" }}>
            <a className="smoothscroll" href="#oyunlar">
              OYUNLAR
            </a>
          </li>
          <li style={{ fontFamily: "Inter-Bold" }}>
          <a className="smoothscroll" href="#atölye">

            {/* <Link to="/atölye"> */}
              ATÖLYE
              {/* </Link> */}
            </a>

          </li>
          <li style={{ fontFamily: "Inter-Bold" }}>
            <a className="smoothscroll" href="https://www.biletix.com/etkinlik/2CB16/TURKIYE/tr">
              BİLET AL
            </a>
          </li>
        </ul>
      </nav>

      <div className="left" >
        <ul className="navbar" >
          <li style={{ fontSize: "10px" }}>
            <Link to="/hakkımızda" style={{ fontWeight: 500 }}>HAKKIMIZDA</Link>
          </li>
          <li className="current">
            <Link to="/ekip" style={{ fontWeight: 500 }}>EKİP</Link>
          </li>
          <li>
            <a href="#oyunlar" style={{ fontWeight: 500 }}>OYUNLAR</a>
          </li>

          <li>
          <a href="#atölye" style={{ fontWeight: 500 }}>
            {/* <Link to="/atölye" style={{ fontWeight: 500 }}> */}
              ATÖLYE
              {/* </Link> */}
              </a>
          </li>
          <li>
            <a className="smoothscroll" href="https://www.biletix.com/etkinlik/2CB16/TURKIYE/tr" style={{ fontWeight: 500 }}>
              BİLET AL
            </a>
          </li>
        </ul>

      </div>
      <div className="mid" style={{ marginLeft: "auto", marginRight: !isMobile() && "auto" }}>
        <a href="#">
          <img style={{ width: isMobile() ? 100 : "100%", borderRadius: 8, marginTop: 20, marginLeft: isMobile() ? 0 : 30 }} src={"images/porosartlogowhite.png"}></img>
        </a>
      </div>
      <div className="right">
        <ul style={{ height: 20 }}>{networks}
          {JSON.parse(localStorage.getItem("user"))?.token &&
            <MDBBtn
              outline
              className='mx-2 px-2'
              color='white'
              size='sm'
              style={{ color: 'white', fontSize: 10 }}
              onClick={() => {
                localStorage.removeItem("user")
              }}
            >
              Logout
            </MDBBtn>
          }
        </ul>

      </div>


    </header>
  );
}
export default Navbar;