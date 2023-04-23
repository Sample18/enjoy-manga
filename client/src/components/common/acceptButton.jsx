import React from "react";
import PropTypes from "prop-types";

const AcceptButton = ({ onClick }) => {
    return (
        <i className="accept-button" onClick={onClick}>
            &#10004;
        </i>
    );
};

AcceptButton.propTypes = {
    onClick: PropTypes.func
};

export default AcceptButton;
