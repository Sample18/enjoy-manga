import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
    const history = useHistory();
    const handleClick = () => history.goBack();
    return (
        <button className="btn btn-secondary mx-4 mb-4" onClick={handleClick}>
            Назад
        </button>
    );
};

export default BackButton;
