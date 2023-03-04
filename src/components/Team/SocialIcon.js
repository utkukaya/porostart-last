import React from 'react';

function SocialIcon(props) {
    const { link, icon, label } = props;
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
     }
    return (
        // <a target="_blank" aria-label={label}
        //    rel="noopener noreferrer" href={link}>
        //     <i className={icon} aria-hidden="true"/>
        // </a>
              <SocialIcon size={20} url={link} bgColor={"black"} style={{ marginLeft: "20px", height: isMobile() ? 20 : 35, width: isMobile() ? 20 : 35 }} />

    );
}

export default SocialIcon;