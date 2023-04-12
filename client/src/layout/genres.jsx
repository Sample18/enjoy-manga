import React from "react";
import { useParams } from "react-router-dom";
import GenrePage from "../components/pages/genrePage";
import GenresPage from "../components/pages/genresPage/genresPage";
import NavBar from "../components/ui/navBar/navBar";

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
