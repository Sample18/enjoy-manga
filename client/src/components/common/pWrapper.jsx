import React from "react";
import PropTypes from "prop-types";

const ParWrapper = ({ children }) => {
    return <p style={{ color: "#999" }}>{children}</p>;
};

ParWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ParWrapper;
