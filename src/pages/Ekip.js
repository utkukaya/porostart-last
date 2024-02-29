import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { info } from '../components/Data/info';
import Team from '../components/Team/Team';
import { MdAdd, MdDelete, MdOutlineArrowBackIosNew } from "react-icons/md";
import Swal from 'sweetalert2';
import authHeader from "../auth/auth-header"
import AppSettings from '../AppSettings';
import axios from 'axios';
import { PopupModal } from '../components/PopupModal';
import MyEditor from '../components/MyEditor';
import ReactQuill from 'react-quill';
export default function Ekip() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }
    const [name, setName] = useState(null)
    const [content, setContent] = useState(null)
    const [file, setFile] = useState(null)
    const [teams, setTeams] = useState([])
    const token = JSON.parse(localStorage.getItem('user'))?.token

    useEffect(() => {
        const getTeams = async () => {
            const response = await axios.get(AppSettings.ServiceUrl + '/Team/GetTeams')
            const resp = response.data
            if (resp?.isSuccess) {
                setTeams(resp.data)
            }
        }
        getTeams()
    }, [])

    const toolbarOptions = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],

    ];

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'list',
        'bullet',
        'indent',
    ];


    const addNewTeamMember = () => {
        var contentInput =
            <ReactQuill
                style={{ whiteSpace: 'pre-wrap' }}
                preserveWhitespace={true}
                // onChange={handleChange}
                formats={formats}
                modules={{
                    toolbar: toolbarOptions
                }}
            />

        Swal.fire({
            title: 'Add New Team Member',
            html: '<input id="name" className="swal2-input" style="height: 35px" placeholder="İsim">' +
                '<input  id="image" type="file" accept="image/*" id="file-input" style="margin-top: 20; margin-left: 100px;">',
           
            preConfirm: () => {
                const name = document.getElementById('name').value;
                //   const content = document.getElementById('content').value;
                const imageFile = document.getElementById('image').files[0];
                setName(name)
                setFile(imageFile)
                handleUpload(name, imageFile);

            },
            showCancelButton: true,
            confirmButtonText: 'Gönder',
            cancelButtonText: 'İptal',
        }).then((result) => {
            if (result.isConfirmed) {
            }
        });

    }

    const handleUpload = async (name, imageFile) => {
        // const API_BASE_URL = "https://localhost:7039/api"
        const headers = authHeader()

        var formData = new FormData();
        formData.append('Name', name)
        formData.append('ImageFile', imageFile);
        // formData.append('TeamContent', "empty");
        formData.append('ImageName', null);
    


        const response = await axios.post(AppSettings.ServiceUrl + '/Team/AddTeamMember', formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'

            }
        })
        const resp = response.data
        if (resp?.isSuccess) {
            const response = await axios.get(AppSettings.ServiceUrl + '/Team/GetTeams')
            const resp = response.data
            if (resp?.isSuccess) {
                setTeams(resp.data)
            }

        }
        return response.data
    }

    // const teamMembers = info.team.map((teamMember, index) => {
    //     return (
    //         <Team key={index} firstName={teamMember.firstName} image={teamMember.image} memberInfo={teamMember.memberInfo} />
    //     );
    // });
    const handleSuccess = async (teamMemberId) => {
        await axios.delete(AppSettings.ServiceUrl + "/Team/DeleteTeamMember?teamMemberId=" + teamMemberId, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'

            }
        })
            .then(async (response) => {
                if (response?.data?.isSuccess) {
                    const response = await axios.get(AppSettings.ServiceUrl + '/Team/GetTeams')
                    const resp = response.data
                    if (resp?.isSuccess) {
                        setTeams(resp.data)
                    }
                }
                // İsteğin başarılı olduğu durumda geri dönen veriyi kullanabilirsiniz.
            })
            .catch(error => {
                console.error(error);
                // İsteğin bir hata ile karşılaştığı durumda hata mesajını alabilirsiniz.
            });


    }
    const handleDeleteImage = (teamMemberId) => {
        PopupModal({
            handleSuccess: () => handleSuccess(teamMemberId)
        })
    }

    const teamMembers = teams.map((teamMember, index) => {
        const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false
        return (
            <>
                <Team key={index} teamId={teamMember.id} deleteButton={isAdmin &&
                    <>
                        <MdDelete
                            size={25}
                            style={{
                                // zIndex: 912931923912
                                // position: 'absolute',
                                // // top: '5%',
                                // // left: '95%',
                                // transform: 'translate(-50%, -50%)',
                                // // padding: '10px',
                                // // backgroundColor: '#0077FF',
                                // // color: 'white',
                                // border: 'none',
                                // borderRadius: '4px',
                                // cursor: 'pointer',
                            }}
                            color="red"
                            onClick={() => handleDeleteImage(teamMember.id)}
                        />
                    </>
                } firstName={teamMember.name} image={AppSettings.ImageUrl + teamMember.imageName} memberInfo={teamMember.teamContent} />
            </>
        );
    });

    return (
        <>
            <Link to="/">
                <MdOutlineArrowBackIosNew size={20} style={{ marginLeft: isMobile() ? 10 : 50, marginTop: isMobile() ? 10 : 50 }} />
            </Link>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <MdAdd size={40} style={{ marginBottom: 20 }} onClick={addNewTeamMember} />
            </div>
            {/* <div style={{ width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ color: "black", fontWeight: "500", fontFamily: "Quicksand", fontSize: "1.1rem", lineHeight: 1.8 }}>
                    <span style={{ fontFamily: "Quicksand-Bold" }}>Ekip</span><br /><br />
                </p>
            </div> */}
            {teamMembers}
        </>
    )
}