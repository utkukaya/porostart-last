import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import './styles.scss';

export default function TheaterModal() {
    const navigate = useNavigate();
    const handleClickCard = (card) => {
        localStorage.setItem("game", JSON.stringify(card))
        navigate(`/oyun`)
    }
    return (
        <div className="main">
            <Hero>
                <div className="container-theater">
                    {/* <Info /> */}
                    <div className="row">
                        {cards.map((card, i) => (
                            <div className="column" onClick={() => handleClickCard(card)}>
                                <Card>
                                    <Image ratio={card.imageRatio} src={card.image} />
                                    <div className="card-title" style={{ fontFamily: "Inter-Bold" }}>{card.title}</div>
                                    <div className="card-body" style={{ fontFamily: "Inter-Thick" }}>{card.description}</div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </Hero>
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
        title: 'Otofaji',
        description:
            "Güç nedir? Bir tahakküm mü yoksa bir özgürlük mü?",
        image: 'images/card1.jpg',
        imageRatio: 4 / 3
    },
];
