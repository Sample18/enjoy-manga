import React from "react";
// import { useHistory } from "react-router-dom";
import DropDownMenu from "../dropDown/dropDownMenu";
import styles from "./navBar.module.css";

const NavBar = () => {
    const { bg } = styles;

    const dropDownPages = [
        {
            link: "/catalog",
            name: "Каталог"
        },
        {
            link: "/genres",
            name: "Жанры"
        },
        {
            link: "/catalog",
            name: "Авторы"
        },
        {
            link: "/",
            name: "На главную"
        }
    ];

    return (
        <header
            className={
                "d-flex justify-content-between align-items-center p-3 border border-dark " +
                bg
            }
        >
            <div className="d-flex align-items-center text-light">
                <DropDownMenu items={dropDownPages} />
                <h5 className="m-0 px-2">Enjoy Manga</h5>
            </div>
            <div className="search">
                <input type="search" />
                <button />
            </div>
            <div className="user_menu"></div>
        </header>
    );
};

export default NavBar;
