import React from "react";
import PropTypes from "prop-types";

const BadgeWrapper = ({ children, color }) => {
    let style;
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
            style = "badge mx-1 mb-1 badgeBacground";
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
