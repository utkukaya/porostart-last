import React from 'react';
import { info } from '../components/Data/info';
import Team from '../components/Team/Team';

export default function AboutUs() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }

    const teamMembers = info.team.map(function (teamMember) {
        return (
            <Team firstName={teamMember.firstName} image={teamMember.image} memberInfo={teamMember.memberInfo} />
        );
      });

    return (
        // <TeamMembers/>
        <>
            <div style={{ width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto" }}>
                {/* <p style={{ color: "black", fontWeight: "500", fontFamily: "Quicksand", fontSize: "1.1rem", lineHeight: 1.8 }}>
                    <span style={{ fontFamily: "Quicksand-Bold" }}>Hakkımızda</span><br /><br />
                    Poros Art Aralık 2022’de Antalya’da Tolga Avcu öncülüğünde kurulan
                    bağımsız kültür sanat oluşumudur.<br /><br />

                    Poros: Platona’göre mitolojideki tanımıyla Eros’un babası, bereket tanrısı
                    aynı zamanda yol anlamına gelir.<br /><br />

                    Tiyatro ve performans sanatında, yol yaratır mottosu ile ilerleyen Poros Art;
                    atölye çalışmalarında disiplinlerarası metodolojileri kullanarak sanat icra
                    etmeyi hedeflemektedir.<br /><br />
                </p> */}
                {info.aboutUsDescription}
            </div>
            <div style={{ width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ color: "black", fontWeight: "500", fontFamily: "Quicksand", fontSize: "1.1rem", lineHeight: 1.8 }}>
                    <span style={{ fontFamily: "Quicksand-Bold" }}>Kadromuz</span><br /><br />
                </p>
            </div>
            {/* <p>Merhaba, Poros Art Hakkında bilgi alma sayfasına hoş geldiniz</p> */}
            {/* {info.team.map(teamMember => {
                <Team firstName={teamMember.firstName} image={teamMember.image} memberInfo={teamMember.memberInfo} />
            })} */}
            {teamMembers}
            {/* <Team firstName="Tolga Avcu | Sanat Yönetmeni" image="images/exampleimage.jpeg" memberInfo={teamMember1()} />
            <Team firstName="Duygu Yakasız | Genel Koordinatör" image="images/exampleimage.jpeg" memberInfo={teamMember1()} />
            <Team firstName="Gül Yavuz | Kreatif Direktör" image="images/exampleimage.jpeg" memberInfo={teamMember1()} />
            <Team firstName="Yağmur Sultan Bilgin | Asistan" image="images/exampleimage.jpeg" memberInfo={teamMember1()} />
            <Team firstName="Melis Lara Seçkin | Asistan" image="images/exampleimage.jpeg" memberInfo={teamMember1()} />
            <Team firstName="Yalgın Ballıkaya | Asistan" image="images/exampleimage.jpeg" memberInfo={teamMember1()} />
            <Team firstName="Cem Cihan Demirsoy | PR ve İletişim" image="images/exampleimage.jpeg" memberInfo={teamMember1()} />
            <Team firstName="Esra Er | Sosyal Medya" image="images/exampleimage.jpeg" memberInfo={teamMember1()} /> */}
            {/* <Team />
            <Team /> */}
        </>
        // <Team/>

    )
}