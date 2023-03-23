import React from "react";
import { useParams } from "react-router-dom";
import CatalogPage from "../components/pages/catalogPage";
import MangaPage from "../components/pages/mangaPage/mangaPage";
import NavBar from "../components/ui/navBar/navBar";
import CommentsProvider from "../hooks/useComments";

const Catalog = () => {
    const { mangaName } = useParams();
    return (
        <>
            <NavBar />
            <CommentsProvider>
                {mangaName ? (
                    <MangaPage mangaName={mangaName} />
                ) : (
                    <CatalogPage />
                )}
            </CommentsProvider>
        </>
    );
};

export default Catalog;
