import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";

const Favorites = ({ onClick, isFav }) => {
    console.log(isFav);
    return (
        <Tooltip
            title={isFav ? "Удалить из избранного" : "В избранное"}
            onClick={onClick}
        >
            <i
                className={
                    isFav
                        ? "bi bi-heart fs-1 text-danger"
                        : "bi bi-heart fs-1 text-light"
                }
            ></i>
        </Tooltip>
    );
};

Favorites.propTypes = {
    onClick: PropTypes.func,
    isFav: PropTypes.bool
};

export default Favorites;
