import React from "react";
import { useParams } from "react-router-dom";
import CatalogPage from "../catalogPage/catalogPage";
import MangaPage from "../mangaPage/mangaPage";

const Catalog = () => {
    const { mangaName } = useParams();
    return mangaName ? <MangaPage name={mangaName} /> : <CatalogPage />;
};

export default Catalog;
