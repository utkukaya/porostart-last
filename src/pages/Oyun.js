import React, { useEffect, useState } from 'react';
import { SlideImages } from '../components/SlideImages';
import TheaterModal from '../components/theaterModal';
import "../fonts/PTSans-Regular.ttf";
import "../fonts/Quicksand-Regular.ttf"
import "../fonts/Quicksand-Bold.ttf"
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Oyun = () => {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [imageRatio, setImageRatio] = useState(0.0)
    useEffect(() => {
        const localOyun = JSON.parse(localStorage.getItem("game"));
        // console.log("localoyun: ", localOyun.title)
        setTitle(localOyun.title)
        setDescription(localOyun.description)
        setImage(localOyun.image)
        setImageRatio(localOyun.imageRatio)
    }, [])

    return (
        <div id="oyunlar" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))",
            // backgroundImage: `url(images/card1.jpg)` ,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: "rgba(255, 0, 0, 0.2)"
        }}>
            <Link to="/">
                <MdOutlineArrowBackIosNew size={20} style={{ marginLeft: isMobile() ? 10 : 50, marginTop: isMobile() ? 10 : 50 }} />
            </Link>
            <div style={{ width: isMobile() ? "90%" : "800px", marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ color: "black", fontWeight: "500", fontFamily: "Inter-Thick", fontSize: "1.1rem", lineHeight: 1.8 }}>
                    <span style={{ fontFamily: "Inter-Bold" }}>Oyun Hakkında:</span><br /><br />
                    <span style={{ paddingLeft: isMobile() ? "0px" : "20%" }}>“Kendini boşuna harcamış olur insan,</span><br />
                    <span style={{ paddingLeft: isMobile() ? "0px" : "20%" }}>Dilediğine erer de sevinç duymazsa.</span><br />
                    <span style={{ paddingLeft: isMobile() ? "0px" : "20%" }}>Yıktığın hayat kendininki olsun daha iyi,</span><br />
                    <span style={{ paddingLeft: isMobile() ? "0px" : "20%" }}>Yıkmakla kazandığın şey kuşkulu bir mutluluksa.”</span><br />
                    <span style={{ paddingLeft: isMobile() ? "0px" : "20%", fontWeight: "500" }}> W. Shakespeare<br /><br /></span>
                    Oyun, insanımsı diye adlandırılan canlıların yaşadığı ütopik bir yaşam düzenini konu
                    ediniyor. Bu düzen içerisinde yaşayan baş karakter Loki, komününde gerçekleşen bir istila
                    sonucunda güce ulaşma sürecini ve ardından güç tutkusunun onda nasıl bir dönüşüm
                    yarattığını tartışıyor.<br /><br />
                    Güç nedir? Bir tahakküm mü yoksa bir özgürlük mü? sorularını merkezine yerleştiren Otofaji
                    insanoğlunun varoluşundan bu yana evrensel bir zaafı olan güç tutkusunu yaşadığımız
                    dünyada sevgi ve barışa değil, totoliterizme dayalı bir anlayışın oluşturduğuna vurgu yapıyor.
                    <br />
                    <br />
                    <span style={{ fontFamily: "Inter-Bold" }}>About Play:</span>
                    <br />
                    <br />
                    The play is about a utopian life order inhabited by creatures called humanoids. The main
                    character, Loki, who lives in this order, discusses the process of reaching power as a result
                    of an invasion in his commune, and then how his passion for power transformed him.
                    <br />
                    <br />
                    What is power? A domination or a freedom? Focusing on the questions of Autophagy, it
                    emphasizes that the passion for power, which has been a universal weakness of human
                    beings since its existence, is based on an understanding based on totalitarianism, not love
                    and peace in the world we live in.
                    <br />
                    <br />
                    Oyun Türü: Postdramatik
                    <br />
                    Oyun Süresi: 45 dk
                    <br />
                    <br />
                    Yazan Yöneten Oynayan: <span style={{ fontFamily: "Inter-Bold" }}>Tolga Avcu</span><br />
                    Yönetmen Yardımcısı:<span style={{ fontFamily: "Inter-Bold" }}> Duygu Yakasız </span><br />
                    Hareket Düzeni: <span style={{ fontFamily: "Inter-Bold" }}>Yağmur Bilgin</span> <br />
                    Reji Asistanları: <span style={{ fontFamily: "Inter-Bold" }}>Yalgın Ballıkaya, Melis Lara Seçkin </span><br />
                    Işık Tasarım:<span style={{ fontFamily: "Inter-Bold" }}> Furkan Kaymaz</span><br />
                    Afiş - Dekor Tasarım:<span style={{ fontFamily: "Inter-Bold" }}> Gül Yavuz </span><br />
                    Dijital İçerik: <span style={{ fontFamily: "Inter-Bold" }}>Cihan Cem Demirsoy </span><br />
                    Kostüm Tasarım : <span style={{ fontFamily: "Inter-Bold" }}>Selma Özelma Şahin </span><br />
                    Ses Tasarım:<span style={{ fontFamily: "Inter-Bold" }}>Sinan Can Sarı Yapım: Poros Art Tiyatro</span> </p>
                {/* <Image ratio={imageRatio} src={image} /> */}
            </div>
            {/* <p>{title}</p> */}
            <SlideImages />
        </div>
    );
}
export default Oyun;

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
