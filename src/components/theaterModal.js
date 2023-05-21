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
        localStorage.setItem("game", JSON.stringify(card))
        navigate(`/oyun`)
    }
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }
    return (
        <div className="main">

            {/* <Hero> */}
            {!isMobile() ?
                <Hero>
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
                </Hero>

                :

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
            }
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
        <div className="hero">
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
        title: 'Otofaji',
        description:
            "Otofaji oyunu postdramatik anlatımıyla merkezde üç parçadan oluşuyor. Oyuncu, sandalye ve bir kumaş. Sandalye formu konstruktif boş yapısıyla oyuncu ile bir özne olarak iletişim kuruyor.",
        image: 'images/card1.jpg',
        imageRatio: 5 / 4
    },
    {
        id: 2,
        title: 'Tiri İle Nesi',
        description:
            "2018 yılında yolculuğuna başlayan Tiri ile Nesi çocuk oyunu Poros Art tiyatro bünyesinde seyircisi ile buluşuyor. ",
        image: 'images/card2.png',
        imageRatio: 4 / 3
    },
];
