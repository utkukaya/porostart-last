// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { info } from '../components/Data/info';
// import { MdOutlineArrowBackIosNew } from "react-icons/md";


// export default function Atölye() {
//     const isMobile = () => {
//         const { innerWidth: width, innerHeight: height } = window;
//         return width < height;
//     }

//     const [atölyeId, setAtölyeId] = useState(0)
//     useEffect(() => {
//         const localAtölye = JSON.parse(localStorage.getItem("atölye"));
//         if (localAtölye && localAtölye.id)
//             setAtölyeId(localAtölye.id)

//         localStorage.removeItem("atölye")
//     }, [])
//     return (
//         // <TeamMembers/>
//         <>
//             <Link to="/">
//                 <MdOutlineArrowBackIosNew size={20} style={{ marginLeft: isMobile() ? 10 : 50, marginTop: isMobile() ? 10 : 50 }} />
//             </Link>
//             <div style={{
//                 width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto"
//             }}>

//                 {atölyeId == 1 ?
//                     info.atölyeDescription :
//                     atölyeId == 3 ?
//                         info.atölyeDescriptionThree :
//                         atölyeId == 2 &&
//                         info.atölyeDescriptionTwo
//                 }
//                 {/* <div  style={{width: "100%", marginLeft: "auto"}}> */}
//                 {atölyeId == 1 ?
//                     <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye1.jpg"} />
//                     :
//                     <>
//                         {atölyeId == 3 ?
//                             <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/veysi_ceri.jpg"} />

//                             :
//                             atölyeId == 2 &&
//                             <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye2.jpg"} />

//                         }
//                     </>
//                 }
//                 {atölyeId === 0 &&
//                     <>
//                         {info.atölyeDescription}
//                         <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye1.jpg"} />
//                         {info.atölyeDescriptionTwo}
//                         <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/atolye2.jpg"} />
//                         {info.atölyeDescriptionThree}
//                         <img style={{ width: isMobile() ? "100%" : "80%", marginLeft: isMobile() ? "0" : "10%" }} src={"images/veysi_ceri.jpg"} />

//                     </>
//                 }

//                 {/* </div> */}
//             </div>
//         </>
//     )
// }


import React, { useEffect, useState } from 'react';
import { SlideImages } from '../components/SlideImages';
import TheaterModal from '../components/theaterModal';
import "../fonts/PTSans-Regular.ttf";
import "../fonts/Quicksand-Regular.ttf"
import "../fonts/Quicksand-Bold.ttf"
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew, MdOutlineEdit, MdOutlineEditOff } from "react-icons/md";
import MyEditor from '../components/MyEditor';
import AppSettings, { Url } from '../AppSettings';
import axios from 'axios';
import authHeader from '../auth/auth-header';
import { MDBBtn } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';


const WorkshopContent = ({ content }) => {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }
    return (

        <div style={{ width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto" }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}
const Atölye = () => {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }

    const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [imageRatio, setImageRatio] = useState(0.0)
    const [workshopId, setWorkshopId] = useState(0)
    const [content, setContent] = useState('')
    const [editable, setEditable] = useState(false)
    const [workshopContent, setWorkshopContent] = useState(null)
    const [workshopImages, setWorkshopImages] = useState([])
    const token = JSON.parse(localStorage.getItem('user'))?.token

    useEffect(() => {
        const localWorkshop = JSON.parse(localStorage.getItem("workshop"));
        setWorkshopId(localWorkshop.id)
        setTitle(localWorkshop.title)
        setDescription(localWorkshop.description)
        setImage(localWorkshop.image)
        setImageRatio(localWorkshop.imageRatio)
    }, [])

    const handleClickEdit = (event) => {
        event.stopPropagation()
        // if(!editable){
        //     setDescription(card.description)
        //     setTitle(card.title)
        // }
        setEditable(!editable)
    }

    const getWorkshopContent = async (workshopId) => {
        const response = await axios.get(AppSettings.ServiceUrl + '/Workshop/GetWorkshopContent?workshopId=' + workshopId)
        const resp = response.data
        if (resp?.isSuccess) {
            setWorkshopContent(resp.data)
            setContent(resp.data?.htmlCode)
        }
    }

    const getWorkshopImage = async () => {
        const localWorkshopId = JSON.parse(localStorage.getItem("workshop")).id;
        const response = await axios.get(AppSettings.ServiceUrl + '/Workshop/GetWorkshopImages?workshopId=' + localWorkshopId)
        const resp = response.data

        if (resp?.isSuccess) {
            var newSlideImages = []

            resp.data.map(newWorkshopImage => {
                var newSlideImage = {
                    id: newWorkshopImage.id,
                    image: AppSettings.ImageUrl + newWorkshopImage.imageName,
                }
                newSlideImages.push(newSlideImage)
            })
            setWorkshopImages(newSlideImages)
        }

    }
    useEffect(() => {
        getWorkshopImage()
    }, [])

    useEffect(() => {
        const localWorkshop = JSON.parse(localStorage.getItem("workshop"));
        getWorkshopContent(localWorkshop.id)
    }, [])



    const handleUpdateWorkshopContent = async (newContent) => {
        // const API_BASE_URL = "https://localhost:7039/api"
        const headers = authHeader()


        var data = {
            id: workshopContent?.id ?? 0,
            htmlCode: newContent,
            workshopId: workshopId
        }

        const response = await axios.post(AppSettings.ServiceUrl + '/Workshop/UpdateWorkshopContent', data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'

            }
        })
        const resp = response.data
        if (resp?.isSuccess) {
            const response = await axios.get(AppSettings.ServiceUrl + '/Workshop/GetWorkshopContent?workshopId=' + workshopId)
            const resp = response.data
            if (resp?.isSuccess) {
                setWorkshopContent(resp.data)
                setContent(resp.data?.htmlCode)
            }

        }
        return response.data
    }

    const addImage = async (formData) => {
        const API_BASE_URL = Url + "/api"
        const token = JSON.parse(localStorage.getItem('user'))?.token
        const response = await axios.post(API_BASE_URL + '/Workshop/AddWorkshopImage',
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
            getWorkshopImage()
        }
        return response.data
    }

    const handleUpload = (event) => {
        const file = event
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var formData = new FormData();
            formData.append('WorkshopId', workshopId)
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

    const handleDeleteWorkshopImage = async () => {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (workshopImages?.length > 0) {
            const response = await axios.delete(
                AppSettings.ServiceUrl + '/Workshop/RemoveWorkshopImage?workshopId=' + workshopId,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                },
            );

            const resp = response.data;
            if (resp?.isSuccess) {
                getWorkshopImage();
            }
        }
    }



    return (
        <div id="atölye" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))",
            // backgroundImage: `url(images/card1.jpg)` ,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: "rgba(255, 0, 0, 0.2)"
        }}>
            <Link to="/">
                <MdOutlineArrowBackIosNew size={20} style={{ marginLeft: isMobile() ? 10 : 50, marginTop: isMobile() ? 10 : 50 }} />
            </Link>

            {isAdmin &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "auto" }}>
                    {
                        !editable ?
                            <MdOutlineEdit size={20} style={{}} onClick={(e) => handleClickEdit(e)} />
                            :
                            <MdOutlineEditOff size={20} style={{}} onClick={(e) => handleClickEdit(e)} />

                    }
                </div>
            }
            {editable &&
                <MyEditor
                    content={content}
                    setContent={setContent}
                    handleUpdateContent={handleUpdateWorkshopContent}
                    handleCancel={() => setEditable(false)}
                />
            }
            {<WorkshopContent content={content} />}
            {/* <p>{title}</p> */}
            {/* <SlideImages /> */}
            {isAdmin &&
                <div style={{ textAlign: "center" }}>
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
                        onClick={() => handleDeleteWorkshopImage()}
                    // onClick={(e) => handleSubmit(e, card)}
                    >
                        Delete Images
                    </MDBBtn>
                </div>
            }
            <div style={{ width: "100%", textAlign: "center", marginTop: 50 }}>
                {workshopImages.map((image, i) => (
                    <img
                        key={i}
                        style={{
                            width: isMobile() ? "100%" : "50%",
                            marginLeft: isMobile() ? "0" : "0%",
                        }}
                        src={image.image}
                        alt={`Image ${i}`}
                    />
                ))}
            </div>

        </div >
    );
}
export default Atölye;

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
