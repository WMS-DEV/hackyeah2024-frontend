import { useNavigate, useOutlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import "./ProtectedLayout.scss";

export const ProtectedLayout = () => {
    const { isTokenValid } = useAuth();
    const outlet = useOutlet();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            navigate("/");
        }
    }, [isTokenValid, navigate]);

    return <div className="protected-layout">{outlet}</div>;
};
