import React from "react";
import PropTypes from "prop-types";

const HeadingWrapper = ({ size, center, children }) => {
    switch (size) {
        case 1:
            return (
                <h1 className={`text-light ${center ? "text-center" : ""}`}>
                    {children}
                </h1>
            );
        case 2:
            return (
                <h2 className={`text-light ${center ? "text-center" : ""}`}>
                    {children}
                </h2>
            );
        case 3:
            return (
                <h3 className={`text-light ${center ? "text-center" : ""}`}>
                    {children}
                </h3>
            );
        case 4:
            return (
                <h4 className={`text-light ${center ? "text-center" : ""}`}>
                    {children}
                </h4>
            );
        case 5:
            return (
                <h5 className={`text-light ${center ? "text-center" : ""}`}>
                    {children}
                </h5>
            );
        case 6:
            return (
                <h6 className={`text-light ${center ? "text-center" : ""}`}>
                    {children}
                </h6>
            );
    }
};

HeadingWrapper.propTypes = {
    size: PropTypes.number,
    center: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default HeadingWrapper;
