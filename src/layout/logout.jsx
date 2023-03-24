import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../components/ui/loader";
import { logOut } from "../store/users";

const LogOut = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
        history.push("/");
    }, []);

    return <Loader />;
};

export default LogOut;
