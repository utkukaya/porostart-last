import React, { useEffect } from 'react';
import "./Navbar.css"
import { SocialIcon } from 'react-social-icons';
import icon from "./icon";
import { BrowserRouter, Link } from 'react-router-dom';
import "./component-style/media-queries.css";

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
      <SocialIcon size={20} url={network.url} bgColor={"white"} style={{ marginLeft: "20px", height: isMobile() ? 20 : 35, width: isMobile() ? 20 : 35 }} />

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
            {/* <video autoplay="" muted="" loop="" playsinline="" id="vid" preload="auto" width="100%"> */}
            {/* <video  autoPlay="autoplay" loop="loop" muted defaultMuted playsinline>

              <source src={isMobile() ? "./dikeyVideo.mp4" :"images/backgroundVideo.mp4"} />
              
            </video> */}
            <video autoPlay loop muted playsInline width={"100%"}>

            <source src={isMobile() ? "images/dikeyVideo.mp4" :"images/backgroundVideo.mp4"} />
              
              </video>
            {/* <video ref={videoRef}>
              <source
                src="./dikeyVideo.mp4"
                type="video/mp4"
              />
            </video> */}

          </div>

        </div>
      </div>
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          {/* Show navigation */}
          <div class="line" style={{width: "60%", borderBottom: "4px solid white", marginTop: "47.5%", marginLeft: "25%", position: "absolute"}}></div>
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          {/* Hide navigation */}
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            {/* <a className="smoothscroll" href="#">
              Hakkımızda
            </a> */}
            <Link to="/hakkımızda">Hakkımızda</Link>
          </li>

          <li>
            <a className="smoothscroll" href="#oyunlar">
              Oyunlar
            </a>
          </li>

          {/* <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li> */}
          {/* 
            <li>
              <a className="smoothscroll" href="#portfolio">
                Works
              </a>
            </li> */}

          <li>
          <Link to="/atölye">Atölye</Link>

            {/* <a className="smoothscroll" href="#calendar">
              Atölye
                          <Link to="/hakkımızda">Hakkımızda</Link>

            </a> */}
          </li>
          {/* https://www.biletix.com/etkinlik/2CB16/TURKIYE/tr */}
          <li>
            <a className="smoothscroll" href="https://www.biletix.com/etkinlik/2CB16/TURKIYE/tr">
              Bilet Al
            </a>
          </li>
        </ul>
      </nav>

      <div className="left" >
        <ul className="navbar" >
          <li>
          <Link to="/hakkımızda" style={{fontWeight: 500}}>Hakkımızda</Link>
          </li>
          <li>
            <a href="#oyunlar" style={{ fontWeight: 500 }}>Oyunlar</a>
          </li>

          <li>
            <Link to="/atölye" style={{fontWeight: 500}}>Atölye</Link>
            {/* <a href="#calendar" style={{ fontWeight: 500 }}>Atölye</a> */}
          </li>
          <li>
            <a className="smoothscroll" href="https://www.biletix.com/etkinlik/2CB16/TURKIYE/tr" style={{ fontWeight: 500 }}>
              Bilet Al
            </a>
          </li>
        </ul>

      </div>
      <div className="mid" style={{ marginLeft: "auto", marginRight: !isMobile() && "auto" }}>
        {/* <ul className="navbar" > */}
        {/* <li> */}

        <a href="#">
          <img style={{ width: isMobile() ? 120 : "80%", borderRadius: 8, marginTop: 20, marginLeft: 10 }} src={"images/logo2.png"}></img>
        </a>
        {/* </li> */}

        {/* </ul> */}

      </div>
      <div className="right">
        <ul style={{ height: 20 }}>{networks}</ul>
      </div>

    </header>
  );
}
export default Navbar;