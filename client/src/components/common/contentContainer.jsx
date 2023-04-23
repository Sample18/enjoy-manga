import React from "react";
import PropTypes from "prop-types";

const ContentContainer = ({ children }) => {
    return (
        <main className="container content-container px-1 py-4 mb-4">
            {children}
        </main>
    );
};

ContentContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ContentContainer;
