import React from "react";
import PropTypes from "prop-types";

const ContentContainer = ({ children }) => {
    return <main className={"container px-1 py-4 bg-dark"}>{children}</main>;
};

ContentContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ContentContainer;
