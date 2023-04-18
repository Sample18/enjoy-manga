import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/users";

const Favorites = ({ currentUser, mangaCrop }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        let favorites;
        const favIndex = currentUser.favorites.findIndex(
            (f) => f === mangaCrop._id
        );
        if (favIndex === -1) {
            favorites = [...currentUser.favorites, mangaCrop._id];
        } else {
            favorites = currentUser.favorites.filter((f, i) => i !== favIndex);
        }

        dispatch(updateUser({ ...currentUser, favorites }));
    };

    const favoriteCheck = () => {
        const favIndex = currentUser.favorites.findIndex(
            (f) => f === mangaCrop._id
        );
        if (favIndex === -1) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <Tooltip
            title={favoriteCheck() ? "Удалить из избранного" : "В избранное"}
            onClick={handleClick}
        >
            <i
                className={
                    favoriteCheck()
                        ? "bi bi-heart fs-1 text-danger"
                        : "bi bi-heart fs-1 text-light"
                }
            ></i>
        </Tooltip>
    );
};

Favorites.propTypes = {
    currentUser: PropTypes.object,
    mangaCrop: PropTypes.object
};

export default Favorites;
