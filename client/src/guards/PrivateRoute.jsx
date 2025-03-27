import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute({ children }) {
    const authData = useContext(UserContext);

    if (!authData._id) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
