import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
import Loader from "./loader";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => setOpen((prevState) => !prevState);

    return currentUser ? (
        <div className="dropdown text-light" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2 text-light">{currentUser.name}</div>
                <Avatar src={currentUser.avatar} alt="avatar" />
            </div>
            <div
                className={
                    "w-100 dropdown-menu dropdown-menu-dark dropstart" +
                    (isOpen ? " show" : "")
                }
            >
                <Link to={`/users/${currentUser.id}`} className="dropdown-item">
                    Избранное
                </Link>
                <Link to={`/logout`} className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default NavProfile;
