import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdOutlineEdit, MdOutlineEditOff, MdOutlineChangeCircle } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import './styles.scss';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Swal from 'sweetalert2'
import { PopupModal } from './PopupModal';
import {
    MDBBtn,
}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import AppSettings, { Url } from '../AppSettings';
import { create } from '@mui/material/styles/createTransitions';

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
    const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false
    const [editable, setEditable] = useState(false)
    const [createNewGame, setCreateNewGame] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState(0)

    const [selectedFile, setSelectedFile] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [imageRatio, setImageRatio] = useState()
    const [file, setFile] = useState();
    const [cards, setCards] = useState([]);
    const [gameFileName, setGameFileName] = useState();


    const [newGameSelectedFile, setNewGameSelectedFile] = useState()
    const [newGameDescription, setNewGameDescription] = useState("Description");
    const [newGameTitle, setNewGameTitle] = useState("Title");
    const [newGameImageRatio, setNewGameImageRatio] = useState(1.33)
    const [newGameFileName, setNewGameFileName] = useState();
    const [newGameFile, setNewGameFile] = useState();


    useEffect(() => {
        getGameCards()
    }, [])

    const getGameCards = async () => {
        const response = await axios.get(AppSettings.ServiceUrl + '/Game/GetGameCards')
        const resp = response.data
        if (resp?.isSuccess && resp?.data) {
            var gameCards = []
            resp.data.map(newGameCard => {
                var gameCard = {
                    id: newGameCard.id,
                    title: newGameCard.title,
                    description: newGameCard.description,
                    image: AppSettings.ImageUrl + newGameCard.imageName,
                    imageRatio: newGameCard.imageRatio
                }
                // gameCard.imageRatio = parseFloat(newGameCard.imageRatio)
                gameCards.push(gameCard)
            })
            setCards(gameCards)

        }
    }

    const handleClickEdit = (event, card) => {
        event.stopPropagation()
        if (!editable) {
            setDescription(card.description)
            setTitle(card.title)
            setImageRatio(card.imageRatio)
        }
        setSelectedCardId(card.id)
        setEditable(!editable)
    }

    const handleSuccess = async () => {
        const token = JSON.parse(localStorage.getItem('user'))?.token

        const response = await axios.delete(AppSettings.ServiceUrl + '/Game/RemoveGameCard?cardId=' + selectedCardId, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'

            }
        })
        const resp = response.data
        if (resp?.isSuccess) {
            getGameCards()
        }
    }
    const handleDeleteImage = (event) => {
        event.stopPropagation()
        PopupModal({
            handleSuccess: handleSuccess
        })
    }

    const handleUpload = (event) => {
        // const selectedFile = event.target.files[0];
        // setSelectedFile(event.target.files[0])
        // const file = event.target.files[0];
        const file = event
        setGameFileName(file.name)
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedFile(reader.result);
            setFile(file)

        };

        // burada, seçilen dosyayı işleyebilirsiniz (örn. yükleme, önizleme vs.)
        Swal.fire({
            icon: 'success',
            title: 'Resim başarıyla yüklendi!',
        });
    };

    const handleClickChangeButton = (event) => {
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

    const handleClickChangeButtonForNewGame = (event) => {
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
                handleUploadForNewGame(selectedFile);
            }
        });
    };


    const handleUploadForNewGame = (event) => {
        const file = event
        setNewGameFileName(file.name)
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setNewGameSelectedFile(reader.result);
            setNewGameFile(file)
        };
        Swal.fire({
            icon: 'success',
            title: 'Resim başarıyla yüklendi!',
        });
    };

    const handleDescriptionChange = (event) => {
        event.stopPropagation()
        setDescription(event.target.value)
    }
    const handleTitleChange = (event) => {
        event.stopPropagation()
        setTitle(event.target.value)
    }

    const handleImageRatioChange = (event) => {
        event.stopPropagation()
        setImageRatio(event.target.value)
        // var splittedImageRatio = event.target.value.split('/')
        // if (splittedImageRatio.length > 2) {
        //     var newImageRatio = splittedImageRatio[0] / splittedImageRatio[1]
        //     setImageRatio(newImageRatio)
        // }
    }

    const handleNewGameDescriptionChange = (event) => {
        event.stopPropagation()
        setNewGameDescription(event.target.value)
    }
    const handleNewGameTitleChange = (event) => {
        event.stopPropagation()
        setNewGameTitle(event.target.value)
    }
    const handleNewGameImageRatioChange = (event) => {
        event.stopPropagation()
        setNewGameImageRatio(event.target.value)
    }

    const handleSubmitForNewGame = async (event) => {
        event.stopPropagation()
        const API_BASE_URL = Url + "/api"
        var formData = new FormData();
        // formData.append('Id', card.id)
        formData.append('Title', newGameTitle)
        formData.append('Description', newGameDescription)
        formData.append('ImageFile', newGameFile);
        formData.append('FileName', newGameFileName);
        formData.append('ImageRatio', newGameImageRatio);


        const token = JSON.parse(localStorage.getItem('user'))?.token
        const response = await axios.post(API_BASE_URL + '/Game/AddGameCard',
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
            setCreateNewGame(false)
            setSelectedCardId(0)
            getGameCards()
        }
        return response.data
    }

    const handleCancel = (e) => {
        e.stopPropagation()
        setEditable(false)
        setSelectedCardId(0)
    }

    const handleCancelForNewGame = (e) => {
        e.stopPropagation()
        setCreateNewGame(false)
    }


    const handleSubmit = async (event, card) => {
        event.stopPropagation()
        const API_BASE_URL = Url + "/api"
        var formData = new FormData();
        formData.append('Id', card.id)
        formData.append('Title', title)
        formData.append('Description', description)
        // formData.append('ImageFile', file);
        // formData.append('FileName', "utku.jpg")
        // formData.append('ImageRatio', "4/3")
        // if (file) {
        formData.append('ImageFile', file);
        formData.append('FileName', gameFileName);
        formData.append('ImageRatio', imageRatio);
        // }
        //  else {
        //     // Eğer file boşsa, varsayılan değerler ekleyebilirsiniz veya hata mesajı gönderebilirsiniz
        //     formData.append('ImageFile', downloadFile(card.image, "default.jpg"));
        //     formData.append('FileName', "default.jpg");
        //     formData.append('ImageRatio', "16/9");
        // }

        const token = JSON.parse(localStorage.getItem('user'))?.token

        const response = await axios.post(API_BASE_URL + '/Game/ChangeGameCard',
            formData,
            {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'

                }
            }
            // { headers: authHeader() }
        )
        const resp = response.data

        if (resp?.isSuccess) {
            setEditable(false)
            getGameCards()
        }
        return response.data
    }

    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }
    return (
        <div className="main">

            {isAdmin && !createNewGame &&
                <div style={{ textAlign: "center" }}>
                    <MDBBtn
                        outline
                        className='me-1 px-5'
                        color='primary'
                        size='lg'
                        onClick={() => setCreateNewGame(true)}
                    >
                        Create New Game
                    </MDBBtn>
                </div>
            }

            {isAdmin && createNewGame &&
                <>
                    <div className="container-theater">
                        <div className="row">
                            <div className="column">
                                <Card>


                                    <div>

                                        <Image
                                            ratio={newGameImageRatio ? newGameImageRatio : 1.33}
                                            // src={card.image}
                                            src={newGameSelectedFile}
                                            isAdmin={isAdmin}
                                            editable={createNewGame}
                                            handleDeleteImage={handleDeleteImage}
                                            handleClickChangeButton={handleClickChangeButtonForNewGame}
                                        />
                                    </div>
                                    <>
                                        <input
                                            className='card-title'
                                            type="text"
                                            value={newGameTitle}
                                            onClick={(event) => { event.stopPropagation() }}
                                            onChange={handleNewGameTitleChange}
                                        />
                                        <textarea
                                            className='card-body'
                                            type="text"
                                            value={newGameDescription}
                                            style={{ width: "100%", display: "block", fontFamily: "Inter-Thick" }}
                                            onClick={(event) => { event.stopPropagation() }}
                                            onChange={handleNewGameDescriptionChange}
                                            rows={5}
                                            cols={5}
                                        />

                                        <input
                                            className='image-ratio'
                                            type="text"
                                            value={newGameImageRatio}
                                            onClick={(event) => { event.stopPropagation() }}
                                            onChange={handleNewGameImageRatioChange}
                                        />
                                    </>
                                    {isAdmin &&
                                        <>
                                            <MDBBtn
                                                outline
                                                className='me-1 px-5 my-2'
                                                color='primary'
                                                size='lg'
                                                onClick={(e) => handleSubmitForNewGame(e)}
                                            >
                                                Save
                                            </MDBBtn>
                                            <MDBBtn
                                                outline
                                                className='me-1 px-5 my-2'
                                                color='danger'
                                                size='lg'
                                                onClick={(e) => handleCancelForNewGame(e)}
                                            >
                                                Cancel
                                            </MDBBtn>
                                        </>
                                    }

                                </Card>
                            </div>
                        </div>
                    </div>
                </>

            }


            {/* <Hero> */}
            {!isMobile() ?
                <>
                    {cards.length > 3 ?
                        <>
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

                                    <div key={i} className="container-theater">
                                        {/* <Info /> */}
                                        <div className="row">
                                            <div className="column" onClick={() => handleClickCard(card)}>
                                                <Card key={i}>
                                                    {isAdmin &&
                                                        <div style={{ marginLeft: "auto" }}>
                                                            {
                                                                !editable ?
                                                                    <MdOutlineEdit size={20} style={{}} onClick={(e) => handleClickEdit(e, card)} />
                                                                    :
                                                                    <>
                                                                        {(card.id === selectedCardId) ?
                                                                            <MdOutlineEditOff size={20} style={{}} onClick={(e) => handleClickEdit(e)} />
                                                                            :
                                                                            <MdOutlineEdit size={20} style={{}} onClick={(e) => handleClickEdit(e, card)} />

                                                                        }
                                                                    </>

                                                            }
                                                        </div>
                                                    }
                                                    <div>

                                                        <Image
                                                            key={i}
                                                            // ratio={"1.33"}
                                                            ratio={editable ? parseFloat(imageRatio) : parseFloat(card.imageRatio)}
                                                            // src={card.image}
                                                            // src={selectedFile ?? card.image}
                                                            src={selectedFile && card.id === selectedCardId ? selectedFile : card.image}
                                                            isAdmin={isAdmin}
                                                            editable={editable && selectedCardId == card.id}
                                                            handleDeleteImage={handleDeleteImage}
                                                            handleClickChangeButton={handleClickChangeButton}
                                                        />
                                                    </div>
                                                    {isAdmin && editable && card.id === selectedCardId ?
                                                        <>
                                                            <input
                                                                className='card-title'
                                                                type="text"
                                                                value={title}
                                                                onClick={(event) => { event.stopPropagation() }}
                                                                onChange={handleTitleChange}
                                                            />
                                                            <textarea
                                                                className='card-body'
                                                                type="text"
                                                                value={description}
                                                                style={{ width: "100%", display: "block", fontFamily: "Inter-Thick" }}
                                                                onClick={(event) => { event.stopPropagation() }}
                                                                onChange={handleDescriptionChange}
                                                                rows={5}
                                                                cols={5}
                                                            />

                                                            <input
                                                                className='image-ratio'
                                                                type="text"
                                                                value={imageRatio}
                                                                onClick={(event) => { event.stopPropagation() }}
                                                                onChange={handleImageRatioChange}
                                                            />
                                                        </>
                                                        :
                                                        <>
                                                            <div className="card-title" style={{ fontFamily: "Inter-Bold" }}>{title && card.id === selectedCardId ? title : card.title}</div>
                                                            <div className="card-body" style={{ fontFamily: "Inter-Thick" }}>{description && card.id === selectedCardId ? description : card.description}</div>
                                                        </>
                                                    }
                                                    {/* <Image ratio={card.imageRatio} src={card.image} />
                                        <div className="card-title" style={{ fontFamily: "Inter-Bold" }}>{card.title}</div>
                                        <div className="card-body" style={{ fontFamily: "Inter-Thick" }}>{card.description}</div> */}

                                                    {isAdmin && editable && card.id == selectedCardId &&
                                                        <>
                                                            <MDBBtn
                                                                outline
                                                                className='me-1 px-5 my-2'
                                                                color='primary'
                                                                size='lg'
                                                                onClick={(e) => handleSubmit(e, card)}
                                                            >
                                                                Save
                                                            </MDBBtn>
                                                            <MDBBtn
                                                                outline
                                                                className='me-1 px-5 my-2'
                                                                color='danger'
                                                                size='lg'
                                                                onClick={(e) => handleCancel(e)}
                                                            >
                                                                Cancel
                                                            </MDBBtn>
                                                        </>
                                                    }
                                                </Card>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </>
                        :
                        <Hero>
                            {cards.map((card, i) => (

                                <div key={i} className="container-theater">
                                    {/* <Info /> */}
                                    <div className="row">
                                        <div className="column" onClick={() => handleClickCard(card)}>
                                            <Card key={i}>
                                                {isAdmin &&
                                                    <div style={{ marginLeft: "auto" }}>
                                                        {
                                                            !editable && card.id != selectedCardId ?
                                                                <MdOutlineEdit size={20} style={{}} onClick={(e) => handleClickEdit(e, card)} />
                                                                :
                                                                <MdOutlineEditOff size={20} style={{}} onClick={(e) => handleClickEdit(e)} />

                                                        }
                                                    </div>
                                                }
                                                <div>

                                                    <Image
                                                        key={i}
                                                        // ratio={"1.33"}
                                                        ratio={editable ? parseFloat(imageRatio) : parseFloat(card.imageRatio)}
                                                        // src={card.image}
                                                        src={selectedFile && card.id === selectedCardId ? selectedFile : card.image}
                                                        isAdmin={isAdmin}
                                                        editable={editable && selectedCardId == card.id}
                                                        handleDeleteImage={handleDeleteImage}
                                                        handleClickChangeButton={handleClickChangeButton}
                                                    />
                                                </div>
                                                {isAdmin && editable && card.id === selectedCardId ?
                                                    <>
                                                        <input
                                                            className='card-title'
                                                            type="text"
                                                            value={title}
                                                            onClick={(event) => { event.stopPropagation() }}
                                                            onChange={handleTitleChange}
                                                        />
                                                        <textarea
                                                            className='card-body'
                                                            type="text"
                                                            value={description}
                                                            style={{ width: "100%", display: "block", fontFamily: "Inter-Thick" }}
                                                            onClick={(event) => { event.stopPropagation() }}
                                                            onChange={handleDescriptionChange}
                                                            rows={5}
                                                            cols={5}
                                                        />

                                                        <input
                                                            className='image-ratio'
                                                            type="text"
                                                            value={imageRatio}
                                                            onClick={(event) => { event.stopPropagation() }}
                                                            onChange={handleImageRatioChange}
                                                        />
                                                    </>
                                                    :
                                                    <>
                                                        <div className="card-title" style={{ fontFamily: "Inter-Bold" }}>{title && card.id === selectedCardId ? title : card.title}</div>
                                                        <div className="card-body" style={{ fontFamily: "Inter-Thick" }}>{description && card.id === selectedCardId ? description : card.description}</div>
                                                    </>
                                                }
                                                {/* <Image ratio={card.imageRatio} src={card.image} />
                                        <div className="card-title" style={{ fontFamily: "Inter-Bold" }}>{card.title}</div>
                                        <div className="card-body" style={{ fontFamily: "Inter-Thick" }}>{card.description}</div> */}

                                                {isAdmin && editable && card.id == selectedCardId &&
                                                    <>
                                                        <MDBBtn
                                                            outline
                                                            className='me-1 px-5 my-2'
                                                            color='primary'
                                                            size='lg'
                                                            onClick={(e) => handleSubmit(e, card)}
                                                        >
                                                            Save
                                                        </MDBBtn>
                                                        <MDBBtn
                                                            outline
                                                            className='me-1 px-5 my-2'
                                                            color='danger'
                                                            size='lg'
                                                            onClick={(e) => handleCancel(e)}
                                                        >
                                                            Cancel
                                                        </MDBBtn>
                                                    </>
                                                }
                                            </Card>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </Hero>
                    }
                </>

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
        </div >
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

// function Image({ratio, src}) {
//     return (
//         <div className="image-container">
//             <div className="image-inner-container">
//                 <div
//                     className="ratio"
//                     style={{
//                         paddingTop: ratio * 100 + '%'
//                     }}
//                 >
//                     <div className="ratio-inner">
//                         <img src={src} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


function Image({ ratio, src, isAdmin, editable, handleDeleteImage, handleClickChangeButton }) {
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
                        {isAdmin && editable &&
                            <>
                                <MdDelete
                                    size={30}
                                    style={{
                                        position: 'absolute',
                                        top: '5%',
                                        left: '95%',
                                        transform: 'translate(-50%, -50%)',
                                        // padding: '10px',
                                        // backgroundColor: '#0077FF',
                                        // color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    color="red"
                                    onClick={handleDeleteImage}
                                />
                                <MdOutlineChangeCircle
                                    size={30}
                                    style={{
                                        position: 'absolute',
                                        top: '15%',
                                        left: '95%',
                                        transform: 'translate(-50%, -50%)',
                                        // padding: '10px',
                                        // backgroundColor: '#0077FF',
                                        // color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleClickChangeButton}
                                />
                            </>
                        }
                        {/* </img> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

// const cards = [
//     {
//         id: 1,
//         title: 'Otofaji',
//         description:
//             "Otofaji oyunu postdramatik anlatımıyla merkezde üç parçadan oluşuyor. Oyuncu, sandalye ve bir kumaş. Sandalye formu konstruktif boş yapısıyla oyuncu ile bir özne olarak iletişim kuruyor.",
//         image: 'images/card1.jpg',
//         imageRatio: 5 / 4
//     },
//     {
//         id: 2,
//         title: 'Tiri İle Nesi',
//         description:
//             "2018 yılında yolculuğuna başlayan Tiri ile Nesi çocuk oyunu Poros Art tiyatro bünyesinde seyircisi ile buluşuyor. ",
//         image: 'images/card2.png',
//         imageRatio: 4 / 3
//     },
// ];
