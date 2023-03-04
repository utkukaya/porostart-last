import React, { Component } from "react";
import Fade from "react-reveal";
import { SocialIcon } from "react-social-icons";

class Footer extends Component {
  render() {
    // if (!this.props.data) return null;
    const social = [
      // {
      //   name: "linkedin",
      //   url: "https://www.linkedin.com/in/utku-sabri-kaya-10011619a/",
      //   className: "fa fa-linkedin"
      // },
      {
        name: "instagram",
        url: "https://instagram.com/porosarttiyatro?igshid=NTdlMDg3MTY=",
        className: "fa fa-instagram"
      },
      {
        name: "twitter",
        url: "https://twitter.com/PorosArt",
        className: "fa fa-twitter"
      }
    ]
    // const networks = social.map(function (network) {
    //   return (
    //     <li key={network.name}>
    //       <a href={network.url}>
    //         <i className={network.className}></i>
    //       </a>
    //     </li>
    //   );
    // });

    const networks = social.map(function (network) {
      return (
        <SocialIcon url={network.url} bgColor={"white"} style={{ marginLeft: "20px", height: 35, width: 35 }} />

      );
    });

    return (
      <footer style={{ backgroundColor: "black", }}>
        {/* <div className="row" style={{ flexDirection: "row" }}> */}
          <Fade bottom>
            {/* <div className="twelve columns" style={{ flexDirection: "row", width: "100%" }}> */}

              <ul className="copyright" style={{ width: "400px", paddingTop: 50, paddingBottom: 50, marginLeft: "auto" , marginRight: "auto"}}>
                <li>&copy; Copyright 2023 POROS ART
                {networks}            
                </li>
                

              </ul>


            {/* </div> */}
          </Fade>
      </footer>
    );
  }
}

export default Footer;
