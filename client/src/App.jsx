import { Routes, Route } from 'react-router-dom';
import "../public/styles/style.css";
import Header from './components/header/Header';
import Home from './components/home/Home';
import HowItWorks from './components/how-it-works/HowItWorks';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PlaceCatalog from './components/place-catalog/PlaceCatalog';
import PlaceCreate from './components/place-create/PlaceCreate';
import Profile from './components/profile/Profile'; // Импортираме Profile.jsx
import EditProfile from './components/profile/EditProfile';
import Footer from './components/footer/Footer';
import './App.css';
import { useState } from 'react';

function App() {
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState(null); // Държим рождената дата тук
    const isLoggedIn = !!email; // Проверяваме дали има логнат потребител

    const handleUpdateBirthdate = (newBirthdate) => {
        setBirthdate(newBirthdate); // Обновяваме датата в App
    };
    
    const userLoginHandler = (email) => {
        setEmail(email);
    };

    const userLogoutHandler = () => {
        setEmail(''); // Изчистваме email при logout
    };

    return (
        <div id="box">
            <Header isLoggedIn={isLoggedIn} onLogout={userLogoutHandler} />

            <main id="main-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/place" element={<PlaceCatalog />} />
                    <Route path="/howItWorks" element={<HowItWorks />} />
                    <Route path="/place/create" element={<PlaceCreate />} />
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
