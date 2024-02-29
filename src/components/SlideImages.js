import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";
import AppSettings, { Url } from "../AppSettings";
export const SlideImages = () => {

  const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false
  const gameId = JSON.parse(localStorage.getItem("game")).id;
  const [slideImages, setSlideImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([]); // Seçilen resimleri saklayacak dizi
  const [imageSelections, setImageSelections] = useState({}); // Her resmin seçim durumunu saklayacak obje
  const [isDeleteImage, setIsDeleteImage] = useState(false)

  const handleImageSelection = (imageId) => {
    if (!selectedImages.find(x => x == imageId)) {
      var newSelectedImages = [...selectedImages]
      newSelectedImages.push(imageId)
      setSelectedImages(newSelectedImages)
    }
    else {
      if (imageSelections[imageId]) {
        var newSelectedImages = [...selectedImages]
        newSelectedImages = newSelectedImages.filter(x => x != imageId)
        setSelectedImages(newSelectedImages)
      }
    }
    setImageSelections((prevSelections) => ({
      ...prevSelections,
      [imageId]: !prevSelections[imageId],
    }));
  };


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

  const getGameImages = async () => {
    const response = await axios.get(AppSettings.ServiceUrl + '/Game/GetGameImages?gameId=' + gameId)
    const resp = response.data

    if (resp?.isSuccess) {
      var newSlideImages = []

      resp.data.map(newGameImage => {
        var newSlideImage = {
          id: newGameImage.id,
          image: AppSettings.ImageUrl + newGameImage.imageName,
        }
        newSlideImages.push(newSlideImage)
      })
      setSlideImages(newSlideImages)
    }

  }
  useEffect(() => {
    getGameImages()
  }, [])


  const addImage = async (formData) => {
    const API_BASE_URL = Url + "/api"
    const token = JSON.parse(localStorage.getItem('user'))?.token
    const response = await axios.post(API_BASE_URL + '/Game/AddGameImage',
      formData,
      {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    )
    const resp = response.data

    if (resp?.isSuccess) {
      getGameImages()
    }
    return response.data
  }

  const handleUpload = (event) => {
    const file = event
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var formData = new FormData();
      formData.append('GameId', gameId)
      formData.append('ImageFile', file);
      formData.append('FileName', file.name)
      addImage(formData)
    };

    Swal.fire({
      icon: 'success',
      title: 'Resim başarıyla yüklendi!',
    });
  };

  const handleAddImage = (event) => {
    event.stopPropagation()
    Swal.fire({
      title: 'Resim yükleme',
      html: '<input type="file" accept="image/*" id="file-input">',
      showCancelButton: true,
      confirmButtonText: 'Yükle',
      preConfirm: () => {
        const fileInput = document.getElementById('file-input');
        const selectedFile = fileInput.files[0];
        if (!selectedFile) {
          Swal.showValidationMessage('Lütfen bir resim seçin!');
        }
        return { file: selectedFile };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedFile = result.value.file;
        handleUpload(selectedFile);
      }
    });
  };

  const deleteImages = async () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    var data = {
      imageIds: selectedImages
    }

    const response = await axios.post(
      AppSettings.ServiceUrl + '/Game/RemoveGameImages', data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      },
    );

    const resp = response.data;
    if (resp?.isSuccess) {
      setIsDeleteImage(false);
      setImageSelections({})
      setSelectedImages([])
      getGameImages();
    }
  };



  const handleDeleteGameImages = () => {
    if (isDeleteImage) {
      deleteImages()
    }
    else {
      setIsDeleteImage(!isDeleteImage)
    }
  }
  // const slideImages = JSON.parse(localStorage.getItem("game")).id === 1 ?
  //   [

  //     {
  //       image: "images/image7.jpg"
  //     },
  //     {
  //       image: "images/image8.png"
  //     },
  //     {
  //       image: "images/image9.jpg"
  //     },
  //   ]
  //   :
  //   [

  //     {
  //       image: "images/image10.jpg"
  //     },
  //     {
  //       image: "images/image11.jpg"
  //     },
  //     {
  //       image: "images/image12.jpg"
  //     },

  //   ]
  return (
    <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: 100 }}>
      {isAdmin &&
        <>
          <MDBBtn
            outline
            className='me-1 px-5 my-2'
            color='primary'
            size='lg'
            onClick={(e) => handleAddImage(e)}
          >
            Add Images
          </MDBBtn>
          <MDBBtn
            outline
            className='me-1 px-5 my-2'
            color='danger'
            size='lg'
            onClick={() => handleDeleteGameImages()}
          // onClick={(e) => handleSubmit(e, card)}
          >
            {isDeleteImage ? "Delete Images" : "Choose Images To Delete"}
          </MDBBtn>
        </>
      }
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={!isDeleteImage}
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
        {slideImages.map((image, idx) => (
          <div key={idx}>
            {isDeleteImage &&
              <input
                type="checkbox"
                checked={imageSelections[image.id]}
                onChange={() => handleImageSelection(image.id)}
              />
            }
            <img src={image.image} style={{ height: 600, border: imageSelections[image.id] ? "1px solid red" : null }} alt={`Image ${idx}`} />
          </div>
        ))}

        {/* {slideImages.map((image, idx) =>
          <img key={idx} src={image.image} style={{ height: 600 }}></img>
        )} */}
      </Carousel>
    </div>
  );
}


