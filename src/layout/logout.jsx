import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../components/ui/loader";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        logout();
        history.push("/");
    }, []);

    return <Loader />;
};

export default LogOut;
