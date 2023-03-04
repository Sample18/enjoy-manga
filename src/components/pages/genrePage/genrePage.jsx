import React from "react";
import { useParams } from "react-router-dom";
import { useGenres } from "../../../hooks/useGenres";

const GenrePage = () => {
    const { genreName } = useParams();
    const { getGenreByName } = useGenres();
    const genre = getGenreByName(genreName);

    return <h1>{genre && genre.description}</h1>;
};

export default GenrePage;
