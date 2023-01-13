import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "../dropDown/dropDownMenu";
import styles from "./navBar.module.css";

const NavBar = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropDownPages = [
    <Link to="/catalog">Каталог</Link>,
    "Жанры",
    "Авторы",
    <Link to="/">На главную</Link>,
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.nav_menu}>
        <i onClick={() => setDropdown(!dropdown)}>
          <img src={"icons/dropDown.svg"} alt="icon" width="40" />
          <DropDownMenu dropdown={dropdown} items={dropDownPages} />
        </i>
        <h3>Enjoy Manga</h3>
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
