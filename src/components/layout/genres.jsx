import React from "react";
import { useParams } from "react-router-dom";
import GenrePage from "../pages/genrePage/genrePage";
import GenresPage from "../pages/genresPage/genresPage";
import NavBar from "../ui/navBar/navBar";

const Genres = () => {
    const { genreName } = useParams();
    return (
        <>
            <NavBar />
            {genreName ? <GenrePage /> : <GenresPage />}
        </>
    );
};

export default Genres;
