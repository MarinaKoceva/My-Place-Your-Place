import { Routes, Route } from 'react-router';
import "../public/styles/style.css";
import Header from './components/header/Header';
import Home from './components/home/Home';
import HowItWorks from './components/how-it-works/HowItWorks';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PlaceCatalog from './components/place-catalog/PlaceCatalog';
import PlaceCreate from './components/place-create/PlaceCreate';
import Footer from './components/footer/Footer';
import './App.css';
import PlaceDetails from './components/place-details/PlaceDetails';
import PlaceEdit from './components/place-edit/PlaceEdit';
import { useState } from 'react';

function App() {
    const [email, setEmail] = useState('');
    const isLoggedIn = !!email; // Ако има email => потребителят е логнат

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
                    <Route path="/place/:placeId/details" element={<PlaceDetails email={email} />} />
                    <Route path="/place/:placeId/edit" element={<PlaceEdit />} />
                    <Route path="/login" element={<Login onLogin={userLoginHandler} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
