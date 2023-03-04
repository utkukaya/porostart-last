// import React from "react";
// import { Slide, Zoom } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
// import "./component-style/slide.css";

// export const SlideImages = () => {
//   const slideImages = [{
//     image:  "images/image1.jpg"
//   },
//   {
//     image:  "images/image2.jpg"
//   },
//   {
//     image:  "images/image3.jpg"
//   },
//   {
//     image:  "images/image4.jpg"
//   },
//   {
//     image:  "images/image5.jpg"
//   },



//   //  ,
//   //   "images/image2.jpg",
//   //   "images/image3.jpg",
//     // "images/image4.jpg",
//     // "images/image5.jpg",
//     // "images/image6.jpg"
//   ];

//   // slideImages.map(image, i => console.log("ima: ", i))
//   // slideImages.map((e, idx) => 
//   //   console.log("i : ", idx % 4)
//   // )
//   const spanStyle = {
//     padding: '20px',
//     background: '#efefef',
//     color: '#000000'
//   }

//   const divStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundSize: 'cover',
//     height: '400px'
//   }

//   return (
//     <div className="slide-container">
//         <Zoom scale={0.4}>
//           {
//             slideImages.map((each, index) => <img key={index} style={{height: 500}} src={each.image} />)
//           }
//         </Zoom>
//       </div>

//     // <div className="slide-container">
//     //     <Slide>
//     //      {slideImages.map((slideImage, index)=> (
//     //         <div key={index}>
//     //           <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.image})` }}>
//     //             {/* <span style={spanStyle}>{slideImage.caption}</span> */}
//     //           </div>
//     //         </div>
//     //       ))} 
//     //     </Slide>
//     //   </div>
//     // <div style={{ backgroundColor: "#F5F5F5", padding: "10px" }}>
//     //   <Slide>
//     //     <div className="each-slide">
//     //       {slideImages.map((image, idx) => 
//     //         // {idx % 4 === 0 && <div className="each-slide">}
//     //         <img src={image.image} style={{ height: 500, marginLeft: 10 }}></img>
//     //       )}
//     //     </div>
//     //     {/* <div className="each-slide">
//     //       <img src={slideImages[0]} style={{height: 500, marginLeft: 10}}></img>
//     //       <img src={slideImages[1]} style={{height: 500,  marginLeft: 10}}></img>
//     //       <img src={slideImages[2]} style={{height: 500,  marginLeft: 10}}></img>
//     //       <img src={slideImages[3]} style={{height: 500,  marginLeft: 10}}></img>

//     //     </div> */}
//     //     {/* <div className="each-slide">
//     //       <div style={{ backgroundImage: `url(${slideImages[1]})` }}></div>
//     //     </div>
//     //     <div className="each-slide">
//     //       <div style={{ backgroundImage: `url(${slideImages[2]})` }}></div>
//     //     </div> */}
//     //   </Slide>
//     // </div>
//   );
// };


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
            <img src={image.image} style={{ height: 500 }}></img>
          )}
      </Carousel>
    </div>
  );
}


