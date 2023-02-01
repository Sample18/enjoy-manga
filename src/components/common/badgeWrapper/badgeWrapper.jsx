import React from "react";
import PropTypes from "prop-types";
import styles from "./badgeWrapper.module.css";

const BadgeWrapper = ({ children }) => {
    const { bg } = styles;
    return <span className={"badge mx-1 mb-1 " + bg}>{children}</span>;
};

BadgeWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BadgeWrapper;
