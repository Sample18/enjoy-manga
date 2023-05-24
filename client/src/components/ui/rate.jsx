import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import calculateRating from "../../utils/calculateRating";
import { useDispatch } from "react-redux";
import { updateManga } from "../../store/product";

const Rate = ({ rating, manga, isLogin }) => {
    const [value, setValue] = useState(rating);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateManga({ ...manga, rate: value }));
    }, [value]);

    return isLogin ? (
        <Rating
            name="simple-controlled"
            size="large"
            value={calculateRating(rating)}
            onChange={(event, newValue) => {
                setValue((prevState) => ({
                    ...prevState,
                    [`rating${newValue}`]: prevState[`rating${newValue}`] + 1
                }));
            }}
        />
    ) : (
        <Rating
            name="read-only"
            size="large"
            value={calculateRating(rating)}
            readOnly
        />
    );
};

Rate.propTypes = {
    rating: PropTypes.object,
    manga: PropTypes.object,
    isLogin: PropTypes.bool
};

export default Rate;
