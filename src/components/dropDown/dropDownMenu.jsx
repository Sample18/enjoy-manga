import React from "react";
import styles from "./dropDownMenu.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DropDownMenu = ({ items }) => {
    const { bg } = styles;
    return (
        <div className="dropdown">
            <button
                className={"btn " + bg}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="bi bi-menu-button text-light"></i>
            </button>
            <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton1"
            >
                {items.map((i) => (
                    <li key={i.link + i.name}>
                        <Link className="dropdown-item" to={i.link}>
                            {i.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

DropDownMenu.propTypes = {
    items: PropTypes.array.isRequired
};

export default DropDownMenu;
