import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../api";
import { useHistory } from "react-router-dom";

const MangaPage = ({ name }) => {
    const [manga, setManga] = useState({});
    const history = useHistory();

    useEffect(() => {
        API.product.getByName(name).then((data) => setManga(data));
    }, []);

    useEffect(() => {
        if (typeof manga === "undefined") return history.push("/catalog");
    }, [manga]);

    return manga ? (
        <h1>
            {manga.name} / {manga.nameRu}
        </h1>
    ) : (
        <h1>load...</h1>
    );
};

MangaPage.propTypes = {
    name: PropTypes.string
};

export default MangaPage;
