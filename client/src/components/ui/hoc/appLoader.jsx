import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadMangaList } from "../../../store/product";
import { loadChaptersList } from "../../../store/chapters";
import { loadGenresList } from "../../../store/genres";
import { getIsLoggedIn, loadUsersList } from "../../../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        dispatch(loadMangaList());
        dispatch(loadChaptersList());
        dispatch(loadGenresList());
    }, []);
    useEffect(() => {
        dispatch(loadUsersList());
    }, [isLoggedIn]);

    return <div className="container">{children}</div>;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
