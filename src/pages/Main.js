// import './App.css';
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import StakeHolder from "../components/Stakeholder";
import CalendarEvents from "./CalendarEvents";
import Oyunlar from "./Oyunlar";
import Footer from "./Footer";
import AtölyeMain from "./AtölyeMain";
function Main() {
    return (
        <>
            <Navbar />
            <Oyunlar />
            <AtölyeMain/>
            <CalendarEvents />
            <StakeHolder />
            {/* <Contact /> */}
            <Footer />
        </>
    );
}

export default Main;