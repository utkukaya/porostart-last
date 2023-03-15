import React, { useState } from "react";


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export const SlideImages = () => {

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
  const slideImages = [{
    image: "images/image1.jpg"
  },
  {
    image: "images/image2.jpg"
  },
  {
    image: "images/image3.jpg"
  },
  {
    image: "images/image4.jpg"
  },
  {
    image: "images/image5.jpg"
  }
  ]

  return (
    <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: 100 }}>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        // autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2000}
        keyBoardControl={false}
        customTransition="all .5"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
          {slideImages.map((image, idx) =>
            <img src={image.image} style={{ height: 600 }}></img>
          )}
      </Carousel>
    </div>
  );
}


