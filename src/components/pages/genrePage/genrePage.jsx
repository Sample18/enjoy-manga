import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../api";

const GenrePage = () => {
    const { genreName } = useParams();
    const history = useHistory();
    const [genre, setGenre] = useState({});

    useEffect(() => {
        API.genres.getByName(genreName).then((data) => setGenre(data));
    }, []);

    useEffect(() => {
        if (typeof genre === "undefined") return history.push("/404");
    }, [genre]);

    return <h1>{genre && genre.description}</h1>;
};

export default GenrePage;
