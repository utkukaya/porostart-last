// import './App.css';
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import StakeHolder from "../components/Stakeholder";
import CalendarEvents from "./CalendarEvents";
import Oyunlar from "./Oyunlar";
import Footer from "./Footer";
function Main() {
    return (
        <>
            <Navbar />
            <Oyunlar />
            <CalendarEvents />
            <StakeHolder />
            {/* <Contact /> */}
            <Footer />
        </>
    );
}

export default Main;