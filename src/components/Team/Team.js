import React, { useEffect, useState } from 'react';
import Style from './home.module.scss';
import classNames from 'classnames';
import { Box } from "@mui/material";
import { info } from '../Data/info';
import MyEditor from '../MyEditor';
import { MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md';
import authHeader from '../../auth/auth-header';
import AppSettings from '../../AppSettings';
import axios from 'axios';

export default function Team(props) {
   const isMobile = () => {
      const { innerWidth: width, innerHeight: height } = window;
      return width < height;
   }

   const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false
   const [editable, setEditable] = useState(false)
   const [isClicked, setIsClicked] = useState(false);
   const [content, setContent] = useState(null)

   const [teamContent, setTeamContent] = useState(null)
   const handleClickEdit = (event) => {
      event.stopPropagation()
      setEditable(!editable)
   }

   const getTeamContent = async () => {
      const response = await axios.get(AppSettings.ServiceUrl + '/Team/GetTeamContent?teamId=' + props.teamId)
      const resp = response.data

      if (resp?.isSuccess) {
         setTeamContent(resp.data)
         setContent(resp.data?.htmlCode)
      }
   }

   useEffect(() => {
      getTeamContent()
   }, [])

   const handleUpdateTeamContent = async (newContent) => {
      // const API_BASE_URL = "https://localhost:7039/api"
      const headers = authHeader()
      var data = {
         id: teamContent?.id ?? 0,
         htmlCode: newContent,
         teamId: props.teamId
      }
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const response = await axios.post(AppSettings.ServiceUrl + '/Team/UpdateTeamContent', data, {
         headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'

         }
      })
      const resp = response.data
      if (resp?.isSuccess) {
         getTeamContent()
         //  const response = await axios.get(AppSettings.ServiceUrl + '/Workshop/GetWorkshopContent?workshopId=' + workshopId)
         //  const resp = response.data
         //  if (resp?.isSuccess) {
         //      setTeamContent(resp.data)
         //      setContent(resp.data?.htmlCode)
         //  }

      }
      return response.data
   }


   return (
      <div style={{}}>
         <Box component={'main'} display={'flex'} flexDirection={{ xs: isMobile() ? "column" : 'row', md: 'row' }} alignItems={'center'}
            justifyContent={'center'}>
            <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'column' }} alignItems={'center'} paddingBottom={2} paddingTop={2}
               justifyContent={'center'} minHeight={isMobile() ? 'calc(40vh)' : 'calc(60vh - 175px)'} width={!isMobile() ? "50%" : "100%"}>
               <Box onClick={() => setIsClicked(!isClicked)} className={classNames(Style.avatar, Style.shadowed)} style={{ background: info.gradient }} component={'img'} src={props.image}
                  width={{ xs: '25vh', md: '30vh' }}
                  height={{ xs: '25vh', md: '30vh' }}
                  marginLeft={isMobile() ? 0 : 4}
                  borderRadius={'50%'} p={'0.05rem'} mb={{ xs: '1rem', sm: 0 }} mr={{ xs: 0, md: '2rem' }} />
               <Box>
                  <h1 style={{ marginLeft: "auto", marginRight: !editable && "auto", fontSize: 20, marginTop: 20 }}>
                     <span style={{ fontFamily: "Inter-Bold", backgroundColor: "#374047", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{props.firstName}</span>
                     {props.deleteButton}

                  </h1>

                  {isClicked &&
                     <>
                        {isAdmin ?
                           <>
                              <div style={{ marginLeft: "auto" }}>
                                 {
                                    !editable ?
                                       <MdOutlineEdit size={20} style={{}} onClick={(e) => handleClickEdit(e)} />
                                       :
                                       <MdOutlineEditOff size={20} style={{}} onClick={(e) => handleClickEdit(e)} />

                                 }
                                 <div style={{ width: isMobile() ? 250 : 300 }} dangerouslySetInnerHTML={{ __html: content }} />
                              </div>
                           </>
                           :
                           <div style={{ width: isMobile() ? 250 : 300 }} dangerouslySetInnerHTML={{ __html: content }} />

                           // <Box component={'p'} p={'0.0rem'} width={250} justifyContent={"center"}>
                           //    {props.memberInfo}
                           // </Box>
                        }
                     </>
                  }
                  {editable &&
                     <div style={{ width: 400, marginTop: 20 }}>
                        <MyEditor
                           content={content}
                           setContent={setContent}
                           handleUpdateContent={handleUpdateTeamContent}
                           handleCancel={() => setEditable(false)}
                        />

                     </div>
                  }
               </Box>
            </Box>
         </Box>
      </div>


   )
}