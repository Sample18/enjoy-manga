import React from "react";
import { useParams } from "react-router-dom";
import CatalogPage from "../components/pages/catalogPage";
import MangaPage from "../components/pages/mangaPage";

const Catalog = () => {
    const { mangaName } = useParams();

    return mangaName ? <MangaPage mangaName={mangaName} /> : <CatalogPage />;
};

export default Catalog;
