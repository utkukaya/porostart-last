import { HashRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css';
import AboutUs from './pages/AboutUs';
import Atölye from './pages/Atölye';
import Ekip from './pages/Ekip';
import LoginForm from './pages/Login';
import Main from './pages/Main';
import Oyun from './pages/Oyun';
function App() {
  
  return (
    <>
      {/* <Main /> */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/oyun" element={<Oyun />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/atölye" element={<Atölye />} />
        <Route path="/ekip" element={<Ekip />} />
        <Route exact path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;