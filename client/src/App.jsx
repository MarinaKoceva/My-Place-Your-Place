import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import { UserContext } from './contexts/UserContext';

import "../public/styles/style.css";

import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import HowItWorks from './components/how-it-works/HowItWorks';
import PlaceCatalog from './components/place-catalog/PlaceCatalog';
import PlaceCreate from './components/place-create/PlaceCreate';
import PlaceDetails from './components/place-details/PlaceDetails';
import PlaceEdit from './components/place-edit/PlaceEdit';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Footer from './components/footer/Footer';
import './App.css';
import Logout from './components/logout/Logout';
import PrivateRoute from './guards/PrivateRoute';
import GuestRoute from './guards/GuestRoute';
import NotFound from './components/not-found/NotFound';

function App() {
    const [authData, setAuthData] = useState({});

    const [profileInfo, setProfileInfo] = useState(() => {
        const saved = localStorage.getItem("profileInfo");
        return saved
            ? JSON.parse(saved)
            : {
                fullName: "Guest User",
                profilePicUrl: "/images/profil-pic1.gif",
                gender: "",
                bio: "",
                notificationsEnabled: false,
                preferredLanguage: "",
                birthdate: { day: "", month: "", year: "" },
            };
    });

    const userLoginHandler = (resultData) => {
        setAuthData({ ...resultData });
    };

    const userLogoutHandler = () => {
        setAuthData({});
        // localStorage.removeItem("profileInfo"); // ако искаш да се чисти
    };

    const handleProfileUpdate = (newProfileData) => {
        setProfileInfo(newProfileData);
        localStorage.setItem("profileInfo", JSON.stringify(newProfileData));
    };

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
            <div id="page-layout">
                <Header />

                <main id="main-wrapper">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/places" element={<PlaceCatalog />} />
                        <Route path="/places/create" element={<PrivateRoute><PlaceCreate /></PrivateRoute>} />

                        <Route path="/places/:placeId/details" element={<PlaceDetails email={authData.email} />} />
                        <Route path="/places/:placeId/edit" element={<PrivateRoute><PlaceEdit /></PrivateRoute>} />

                        <Route path="/howItWorks" element={<HowItWorks />} />

                        <Route path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile
                                        _id={authData._id}
                                        onLogout={userLogoutHandler}
                                        {...profileInfo}
                                    />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/profile/edit"
                            element={
                                <EditProfile
                                    onUpdateProfile={handleProfileUpdate}
                                    profileData={profileInfo} // 🟢 добавено
                                />
                            }
                        />

                        <Route path="/login" element={<Login onLogin={userLoginHandler} />} />
                        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </UserContext.Provider>
    );
}

export default App;
