import React from "react";
import PropTypes from "prop-types";

const RemoveButton = ({ onClick }) => {
    return (
        <i className="remove-button" onClick={onClick}>
            &#10005;
        </i>
    );
};

RemoveButton.propTypes = {
    onClick: PropTypes.func
};

export default RemoveButton;
