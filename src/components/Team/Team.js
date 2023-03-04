import React, { useState } from 'react';
import Style from './home.module.scss';
import classNames from 'classnames';
import { Box } from "@mui/material";
import { info } from '../Data/info';

export default function Team(props) {
   const isMobile = () => {
      const { innerWidth: width, innerHeight: height } = window;
      return width < height;
   }

   const [isClicked, setIsClicked] = useState(false);

   return (
      <Box component={'main'} display={'flex'} flexDirection={{ xs: isMobile() ? "column" : 'row', md: 'row' }} alignItems={'center'}
         justifyContent={'center'}>
         <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'column' }} alignItems={'center'} paddingBottom={2} paddingTop={2}
            justifyContent={'center'} minHeight={isMobile() ? 'calc(40vh)' : 'calc(60vh - 175px)'} width={!isMobile() ? "50%" : "100%"}>
            <Box onClick={() => setIsClicked(!isClicked)} className={classNames(Style.avatar, Style.shadowed)} alt={'image of developer'} style={{ background: info.gradient }} component={'img'} src={props.image}
               width={{ xs: '25vh', md: '30vh' }}
               height={{ xs: '25vh', md: '30vh' }}
               borderRadius={'50%'} p={'0.05rem'} mb={{ xs: '1rem', sm: 0 }} mr={{ xs: 0, md: '2rem' }} />
            <Box>
               <h1 style={{marginLeft: "auto"}}><span style={{ backgroundColor: "#374047", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{props.firstName}</span>
               {/* <span className={Style.hand}>🤚</span> */}
               </h1>
               {isClicked &&
                  <>
                     {/* <h2>Poros Art'ın {info.position}.</h2> */}
                     <Box component={'p'} p={'0.0rem'} width={250} justifyContent={"center"}>
                        {props.memberInfo}
                     </Box>
                  </>
               }
            </Box>
         </Box>
         {/* <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'} paddingBottom={2} paddingTop={2}
            justifyContent={'center'} minHeight={isMobile() ? 'calc(70vh)' :'calc(70vh - 175px)'} width={!isMobile() ? "50%" : "100%"}>
            <Box className={classNames(Style.avatar, Style.shadowed)} alt={'image of developer'} style={{ background: info.gradient }} component={'img'} src={me}
               width={{ xs: '25vh', md: '30vh' }}
               height={{ xs: '25vh', md: '30vh' }}
               borderRadius={'50%'} p={'0.05rem'} mb={{ xs: '1rem', sm: 0 }} mr={{ xs: 0, md: '2rem' }} />
            <Box>
               <h1>Merhaba, ben <span style={{ backgroundColor: "#374047", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{info.firstName}</span><span className={Style.hand}>🤚</span>
               </h1>
               <h2>Poros Art'ın {info.position}.</h2>
              
               <Box component={'p'} p={'0.0rem'} width={250} justifyContent={"center"}>
               <p>Burada kişi ile ilgili bilgi paylaşıcaz ve aşağıda da istediğim social iconları ekleme çıkarma yapabiliriz.</p>
               </Box>
               <Box display={'flex'} gap={'1.5rem'} justifyContent={'center'} fontSize={{ xs: '2rem', md: '2.5rem' }}>
                  {info.socials.map((social, index) => (
                     <SocialIcon size={20} url={social.link} bgColor={"black"} style={{ marginLeft: "0px", height: isMobile() ? 20 : 35, width: isMobile() ? 20 : 35 }} />

                     // <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label} />
                  ))}
               </Box>
            </Box>
         </Box> */}
      </Box>


   )
}