import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import './styles.scss';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import AppSettings, { Url } from '../AppSettings';
import Swal from 'sweetalert2';
import { PopupModal } from './PopupModal';
import { MdDelete, MdOutlineChangeCircle, MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md';

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
    const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false

    const navigate = useNavigate();
    const [createNewWorkshop, setCreateNewWorkshop] = useState(false)
    const handleClickCard = (card) => {
        localStorage.setItem("workshop", JSON.stringify(card))
        navigate(`/workshop`)
    }
    const [selectedWorkshopId, setSelectedWorkshopId] = useState(0)

    const [selectedFile, setSelectedFile] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [imageRatio, setImageRatio] = useState()
    const [file, setFile] = useState();
    const [workshops, setWorkshops] = useState([]);
    const [workshopFileName, setWorkshopFileName] = useState();
    const [editable, setEditable] = useState(false)

    const [newWorkshopSelectedFile, setNewWorkshopSelectedFile] = useState()
    const [newWorkshopDescription, setNewWorkshopDescription] = useState("Description");
    const [newWorkshopTitle, setNewWorkshopTitle] = useState("Title");
    const [newWorkshopImageRatio, setNewWorkshopImageRatio] = useState(1.33)
    const [newWorkshopFileName, setNewWorkshopFileName] = useState();
    const [newWorkshopFile, setNewWorkshopFile] = useState();


    useEffect(() => {
        getWorkshops()
    }, [])

    const getWorkshops = async () => {
        const response = await axios.get(AppSettings.ServiceUrl + '/Workshop/GetWorkshops')
        const resp = response.data
        if (resp?.isSuccess && resp?.data) {
            var workshops = []
            resp.data.map(newWorkshop => {
                var workshop = {
                    id: newWorkshop.id,
                    title: newWorkshop.title,
                    description: newWorkshop.description,
                    image: AppSettings.ImageUrl + newWorkshop.imageName,
                    imageRatio: newWorkshop.imageRatio
                }
                workshops.push(workshop)
            })
            setWorkshops(workshops)

        }
    }

    const handleNewWorkshopDescriptionChange = (event) => {
        event.stopPropagation()
        setNewWorkshopDescription(event.target.value)
    }
    const handleNewWorkshopTitleChange = (event) => {
        event.stopPropagation()
        setNewWorkshopTitle(event.target.value)
    }
    const handleNewWorkshopImageRatioChange = (event) => {
        event.stopPropagation()
        setNewWorkshopImageRatio(event.target.value)
    }

    const handleSubmitForNewWorkshop = async (event) => {
        event.stopPropagation()
        const API_BASE_URL = Url + "/api"
        var formData = new FormData();
        formData.append('Title', newWorkshopTitle)
        formData.append('Description', newWorkshopDescription)
        formData.append('ImageFile', newWorkshopFile);
        formData.append('FileName', newWorkshopFileName);
        formData.append('ImageRatio', newWorkshopImageRatio);


        const token = JSON.parse(localStorage.getItem('user'))?.token
        const response = await axios.post(API_BASE_URL + '/Workshop/AddWorkshop',
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
            setCreateNewWorkshop(false)
            getWorkshops()
        }
        return response.data
    }

    const handleCancelForNewWorkshop = (e) => {
        e.stopPropagation()
        setCreateNewWorkshop(false)
    }

    const handleSubmit = async (event, card) => {
        event.stopPropagation()
        const API_BASE_URL = Url + "/api"
        var formData = new FormData();
        formData.append('Id', card.id)
        formData.append('Title', title)
        formData.append('Description', description)
        formData.append('ImageFile', file);
        formData.append('FileName', workshopFileName);
        formData.append('ImageRatio', imageRatio);

        const token = JSON.parse(localStorage.getItem('user'))?.token

        const response = await axios.post(API_BASE_URL + '/Workshop/ChangeWorkshop',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'

                }
            }
        )
        const resp = response.data

        if (resp?.isSuccess) {
            setEditable(false)
            setSelectedWorkshopId(0)
            getWorkshops()
        }
        return response.data
    }

    const handleCancel = (e) => {
        e.stopPropagation()
        setEditable(false)
        setSelectedWorkshopId(0)
    }

    const handleUpload = (event) => {
        const file = event
        setWorkshopFileName(file.name)
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedFile(reader.result);
            setFile(file)
        };
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

    const handleClickChangeButtonForNewWorkshop = (event) => {
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
                handleUploadForNewWorkshop(selectedFile);
            }
        });
    };


    const handleUploadForNewWorkshop = (event) => {
        const file = event
        setNewWorkshopFileName(file.name)
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setNewWorkshopSelectedFile(reader.result);
            setNewWorkshopFile(file)
        };
        Swal.fire({
            icon: 'success',
            title: 'Resim başarıyla yüklendi!',
        });
    };

    const handleDeleteImage = (event) => {
        event.stopPropagation()
        PopupModal({
            handleSuccess: handleSuccess
        })
    }

    const handleSuccess = async () => {
        const token = JSON.parse(localStorage.getItem('user'))?.token

        const response = await axios.delete(AppSettings.ServiceUrl + '/Workshop/RemoveWorkshop?workshopId=' + selectedWorkshopId, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'

            }
        })
        const resp = response.data
        if (resp?.isSuccess) {
            getWorkshops()
        }
    }

    const handleClickEdit = (event, card) => {
        event.stopPropagation()
        if (!editable) {
            setDescription(card.description)
            setTitle(card.title)
            setImageRatio(card.imageRatio)
        }
        setSelectedWorkshopId(card.id)
        setEditable(!editable)
    }

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
    }


    return (
        <div className="main">
            {isAdmin && !createNewWorkshop &&
                <div style={{ textAlign: "center" }}>
                    <MDBBtn
                        outline
                        className='me-1 px-5'
                        color='primary'
                        size='lg'
                        onClick={() => setCreateNewWorkshop(true)}
                    >
                        Create New Workshop
                    </MDBBtn>
                </div>
            }

            {isAdmin && createNewWorkshop &&
                <>
                    <div className="container-theater">
                        {/* <Info /> */}
                        <div className="row">
                            <div className="column">

                                <Card>


                                    <div>

                                        <Image
                                            ratio={newWorkshopImageRatio ? newWorkshopImageRatio : 1.33}
                                            src={newWorkshopSelectedFile}
                                            isAdmin={isAdmin}
                                            editable={createNewWorkshop}
                                            handleDeleteImage={handleDeleteImage}
                                            handleClickChangeButton={handleClickChangeButtonForNewWorkshop}
                                        />
                                    </div>
                                    <>
                                        <input
                                            className='card-title'
                                            type="text"
                                            value={newWorkshopTitle}
                                            onClick={(event) => { event.stopPropagation() }}
                                            onChange={handleNewWorkshopTitleChange}
                                        />
                                        <textarea
                                            className='card-body'
                                            type="text"
                                            value={newWorkshopDescription}
                                            style={{ width: "100%", display: "block", fontFamily: "Inter-Thick" }}
                                            onClick={(event) => { event.stopPropagation() }}
                                            onChange={handleNewWorkshopDescriptionChange}
                                            rows={5}
                                            cols={5}
                                        />

                                        <input
                                            className='image-ratio'
                                            type="text"
                                            value={newWorkshopImageRatio}
                                            onClick={(event) => { event.stopPropagation() }}
                                            onChange={handleNewWorkshopImageRatioChange}
                                        />
                                    </>
                                    {isAdmin &&
                                        <>
                                            <MDBBtn
                                                outline
                                                className='me-1 px-5 my-2'
                                                color='primary'
                                                size='lg'
                                                onClick={(e) => handleSubmitForNewWorkshop(e)}
                                            >
                                                Save
                                            </MDBBtn>
                                            <MDBBtn
                                                outline
                                                className='me-1 px-5 my-2'
                                                color='danger'
                                                size='lg'
                                                onClick={(e) => handleCancelForNewWorkshop(e)}
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
                {/* {workshops.map((card, i) => (

                    <div className="container-theater">
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
                ))} */}
                {workshops.map((card, i) => (

                    <div key={i} className="container-theater" style={{marginTop: 20}}>
                        {/* <Info /> */}
                        <div className="row">
                            <div className="column" onClick={() => handleClickCard(card)}>
                                <Card key={i}>
                                    {isAdmin &&
                                        <div style={{ marginLeft: "auto" }}>
                                            {
                                                !editable && card.id != selectedWorkshopId ?
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
                                            src={selectedFile && card.id === selectedWorkshopId ? selectedFile : card.image}
                                            isAdmin={isAdmin}
                                            editable={editable && selectedWorkshopId == card.id}
                                            handleDeleteImage={handleDeleteImage}
                                            handleClickChangeButton={handleClickChangeButton}
                                        />
                                    </div>
                                    {isAdmin && editable && card.id === selectedWorkshopId ?
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
                                            <div className="card-title" style={{ fontFamily: "Inter-Bold" }}>{title && card.id === selectedWorkshopId ? title : card.title}</div>
                                            <div className="card-body" style={{ fontFamily: "Inter-Thick" }}>{description && card.id === selectedWorkshopId ? description : card.description}</div>
                                        </>
                                    }

                                    {isAdmin && editable && card.id == selectedWorkshopId &&
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
        <div className="hero" style={{ width: "90%", marginLeft: "auto", marginRight: "auto", backgroundColor: "black" }}>

            <div className="hero-body">{children}</div>
        </div>
    );
}

// function Image({ ratio, src }) {
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
