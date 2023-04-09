import React from "react";
import PropTypes from "prop-types";
import styles from "./badgeWrapper.module.css";

const BadgeWrapper = ({ children, color }) => {
    let style;
    const { bg } = styles;
    switch (color) {
        case "success":
            style = "badge bg-success";
            break;
        case "warning":
            style = "badge bg-warning text-dark";
            break;
        case "danger":
            style = "badge bg-danger";
            break;

        default:
            style = `badge mx-1 mb-1 ${bg}`;
            break;
    }

    return <span className={style}>{children}</span>;
};

BadgeWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    color: PropTypes.string
};

export default BadgeWrapper;
