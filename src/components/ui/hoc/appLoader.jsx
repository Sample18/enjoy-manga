import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loadMangaList } from "../../../store/product";
import { loadChaptersList } from "../../../store/chapters";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMangaList());
        dispatch(loadChaptersList());
    }, []);

    return <div className="container">{children}</div>;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
