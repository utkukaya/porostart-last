import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import './styles.scss';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

export default function TheaterModal() {
    const navigate = useNavigate();
    const handleClickCard = (card) => {
        localStorage.setItem("atölye", JSON.stringify(card))
        navigate(`/atölye`)
    }
    return (
        <div className="main">

            {/* <Hero> */}
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={false}
                    // autoPlay={deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={2000}
                    keyBoardControl={false}
                    customTransition="all .5"
                    transitionDuration={1000}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {cards.map((card, i) => (

                        <div className="container-theater">
                            {/* <Info /> */}
                            <div className="row">
                                <div className="column" onClick={() => handleClickCard(card)}>
                                    <Card>
                                        <Image ratio={card.imageRatio} src={card.image} />
                                        <div className="card-title" style={{ fontFamily: "Inter-Bold" }}>{card.title}</div>
                                        <div className="card-body" style={{ fontFamily: "Inter-Thick" }}>{card.description}</div>
                                    </Card>
                                </div>

                            </div>
                        </div>
                    ))}
                </Carousel>

            {/* </Hero> */}
        </div>
    );
}

function Card({ children }) {
    const ref = useRef();

    const [isHovered, setHovered] = useState(false);

    const [animatedProps, setAnimatedProps] = useSpring(() => {
        return {
            xys: [0, 0, 1],
            config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
        };
    });

    return (
        <animated.div
            ref={ref}
            className="card"
            onMouseEnter={() => setHovered(true)}

            style={{
                zIndex: isHovered ? 2 : 1,
                transform: animatedProps.xys.interpolate(
                    (x, y, s) =>
                        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
                ),
                marginLeft: "auto",
                marginRight: "auto"
            }}
        >
            {children}
        </animated.div>
    );
}


function Hero({ children }) {
    return (
        // <div className="hero" style={{ backgroundColor: "black" }}>
        <div className="hero" style={{ width: "90%", marginLeft: "auto", marginRight: "auto", backgroundColor: "black"}}>

            <div className="hero-body">{children}</div>
        </div>
    );
}

function Image({ ratio, src }) {
    return (
        <div className="image-container">
            <div className="image-inner-container">
                <div
                    className="ratio"
                    style={{
                        paddingTop: ratio * 100 + '%'
                    }}
                >
                    <div className="ratio-inner">
                        <img src={src} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Info() {
    return (
        <div className="info">
            Springy cards from{' '}
            <a target="_blank" href="https://bit.ly/382KSdo">
                divjoy.com
            </a>
            <div className="notice">(best viewed at larger screen width)</div>
        </div>
    );
}

const cards = [
    {
        id: 1,
        title: 'Emre Basalak ile Başlangıç Gerçek Oyun',
        description:
            "Oyuncu ve yönetmen Emre Basalak ile iki gün sürücek Başlangıç Gerçek Oyun atölyesi 3-4 Mayıs tarihlerinde İpekten Sahne'de gerçekleşecektir.",
        image: 'images/emre_basalak.jpg',
        imageRatio: 3 / 3
    },
    {
        id: 2,
        title: 'Erdoğan Kaplan ile TAI CHI VE QIGONG',
        description:
            "Sahne sanatları eğitiminde nefes ve beden çalışmaları zihinsel ve fiziksel denge açısından çok önemli bir yere sahiptir. Tai Chi ve Qigong atölyemiz 10 Mart Cuma İpekten Sahne'de gerçekleşecektir.",
        image: 'images/poros_atolye_erdogan.jpg',
        imageRatio: 3 / 3
    },
    {
        id: 3,
        title: "Doçent Doktor Veysi Çeri ile Doğal Afet Sonrası Çocuklarla İletişim",
        description:
            "Doçent Doktor Veysi Çeri ile 'Doğal Afet Sonrası Çocuklarla İletişim' başlıklı konuşma programımız 12 Mart Pazar günü İpekten Sahne'de gerçekleşecektir.",
        image: 'images/veysi_ceri.jpg',
        imageRatio: 3 / 3
    },
];
