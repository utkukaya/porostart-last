import React, { Component } from "react";
import Fade from "react-reveal";
import { SocialIcon } from "react-social-icons";

class Footer extends Component {

  render() {
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
        <SocialIcon url={network.url} bgColor={"white"} style={{ marginLeft: "20px", height: 35, width: 35, }} />

      );
    });

    return (
      isMobile() ?
        <footer style={{ backgroundColor: "black", flexDirection: "column" }}>
          <Fade bottom>
            <ul className="copyright" style={{ width: "100%", paddingTop: 50, paddingBottom: 50, marginLeft: "auto", marginRight: "auto" }}>
              <div style={{ paddingTop: 0 }}>
                {networks}
              </div>
              <div style={{ width: "90%", marginLeft: "auto", marginTop: 35 }}>
                {/* <li style={{}}> */}
                  &copy; Copyright 2023 POROS ART
                {/* </li> */}
              </div>

            </ul>
          </Fade>
        </footer>
        :
        <footer style={{ backgroundColor: "black", flexDirection: "row", paddingBottom: 20 }}>
          <Fade bottom>
            <ul className="copyright" style={{ width: "100%", paddingTop: 50, paddingBottom: 50, marginLeft: "auto", marginRight: "auto", backgroundColor: "black" }}>
              <div style={{ width: "50%", float: "left" }}>
                &copy; Copyright 2023 POROS ART
              </div>
              <div style={{ width: "25%", float: "right", paddingBottom: 20, paddingRight: 20 }}>
                <div style={{ marginLeft: "auto" }}>
                  {networks}
                </div>
              </div>

            </ul>
          </Fade>
        </footer>
    );
  }
}

export default Footer;
