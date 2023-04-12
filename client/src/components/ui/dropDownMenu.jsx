import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DropDownMenu = ({ items }) => {
    return (
        <div className="dropdown">
            <button
                className={"btn btn-dark"}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="bi bi-list text-light fs-4"></i>
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
