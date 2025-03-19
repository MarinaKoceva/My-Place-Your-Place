import { Routes, Route } from 'react-router-dom';
import "../public/styles/style.css";
import Header from './components/header/Header';
import Home from './components/home/Home';
import HowItWorks from './components/how-it-works/HowItWorks';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PlaceCatalog from './components/place-catalog/PlaceCatalog';
import PlaceCreate from './components/place-create/PlaceCreate';
import PlaceDetails from './components/place-details/PlaceDetails'; // Добавен маршрут за детайли
import PlaceEdit from './components/place-edit/PlaceEdit'; // Добавен маршрут за редакция
import Profile from './components/profile/Profile'; 
import EditProfile from './components/profile/EditProfile';
import Footer from './components/footer/Footer';
import './App.css';
import { useState } from 'react';

function App() {
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState(null);
    const isLoggedIn = !!email; 

    const handleUpdateBirthdate = (newBirthdate) => {
        setBirthdate(newBirthdate);
    };
    
    const userLoginHandler = (email) => {
        setEmail(email);
    };

    const userLogoutHandler = () => {
        setEmail('');
    };

    return (
        <div id="box">
            <Header isLoggedIn={isLoggedIn} onLogout={userLogoutHandler} />

            <main id="main-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/places" element={<PlaceCatalog />} />
                    <Route path="/places/create" element={<PlaceCreate />} />
                    
                    {/* 🏡 Добавени маршрути за детайли и редакция */}
                    <Route path="/places/:placeId/details" element={<PlaceDetails email={email} />} />
                    <Route path="/places/:placeId/edit" element={<PlaceEdit />} />
                    
                    <Route path="/howItWorks" element={<HowItWorks />} />
                    <Route path="/profile" element={<Profile email={email} birthdate={birthdate} />} />
                    <Route path="/profile/edit" element={<EditProfile email={email} onUpdateBirthdate={handleUpdateBirthdate} />} />
                    <Route path="/login" element={<Login onLogin={userLoginHandler} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
