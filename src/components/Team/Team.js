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
            <Box onClick={() => setIsClicked(!isClicked)} className={classNames(Style.avatar, Style.shadowed)} style={{ background: info.gradient }} component={'img'} src={props.image}
               width={{ xs: '25vh', md: '30vh' }}
               height={{ xs: '25vh', md: '30vh' }}
               borderRadius={'50%'} p={'0.05rem'} mb={{ xs: '1rem', sm: 0 }} mr={{ xs: 0, md: '2rem' }} />
            <Box>
               <h1 style={{ marginLeft: "auto" }}>
                  <span style={{ fontFamily: "Inter-Bold", backgroundColor: "#374047", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{props.firstName}</span>
               </h1>
               {isClicked &&
                  <>
                     <Box component={'p'} p={'0.0rem'} width={250} justifyContent={"center"}>
                        {props.memberInfo}
                     </Box>
                  </>
               }
            </Box>
         </Box>
      </Box>


   )
}