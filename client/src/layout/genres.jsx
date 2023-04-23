import React from "react";
import { useParams } from "react-router-dom";
import GenrePage from "../components/pages/genrePage";
import GenresPage from "../components/pages/genresPage";

const Genres = () => {
    const { genreName } = useParams();
    return genreName ? <GenrePage /> : <GenresPage />;
};

export default Genres;
