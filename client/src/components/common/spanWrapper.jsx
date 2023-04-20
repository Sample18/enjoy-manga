import React from "react";
import PropTypes from "prop-types";

const SpanWrapper = ({ children }) => {
    return <span className="gray-color">{children}</span>;
};

SpanWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default SpanWrapper;
