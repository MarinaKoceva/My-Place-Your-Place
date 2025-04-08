import { createContext } from "react";


export const UserContext = createContext({
    _id: '',
    email: '',
    username: '',
    profilePicUrl: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});
