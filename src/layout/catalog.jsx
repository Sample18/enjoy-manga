import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CatalogPage from "../components/pages/catalogPage";
import MangaPage from "../components/pages/mangaPage/mangaPage";
import NavBar from "../components/ui/navBar/navBar";
import { loadCommentsList } from "../store/comments";

const Catalog = () => {
    const { mangaName } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList());
    }, []);
    return (
        <>
            <NavBar />
            {mangaName ? <MangaPage mangaName={mangaName} /> : <CatalogPage />}
        </>
    );
};

export default Catalog;
