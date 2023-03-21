import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => setOpen((prevState) => !prevState);

    return (
        <div className="dropdown text-light" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2 text-light">{currentUser.name}</div>
                <img
                    src={currentUser.avatar}
                    alt="avatar"
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div
                className={
                    "w-100 dropdown-menu dropdown-menu-dark" +
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
    );
};

export default NavProfile;
