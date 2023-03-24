import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
    const history = useHistory();
    const handleClick = () => history.goBack();
    return (
        <button className="btn btn-dark" onClick={handleClick}>
            Назад
        </button>
    );
};

export default BackButton;
