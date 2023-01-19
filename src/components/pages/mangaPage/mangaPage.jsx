import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";
import { useHistory } from "react-router-dom";
import ContentContainer from "../../common/contentContainer";

const MangaPage = ({ mangaName }) => {
    const [manga, setManga] = useState({});
    const history = useHistory();

    useEffect(() => {
        API.product.getByName(mangaName).then((data) => setManga(data));
    }, []);

    useEffect(() => {
        if (typeof manga === "undefined") return history.push("/catalog");
    }, [manga]);

    console.log(manga);

    return manga ? (
        <ContentContainer>
            <div className="d-flex">
                <img
                    src={"/" + manga.cover}
                    width="325"
                    height="450"
                    className="mx-4"
                />
                <h1 className="text-white">
                    {manga.name} / {manga.nameRu}
                </h1>
            </div>
            <div>
                <p className="text-white">{manga.description}</p>
            </div>
        </ContentContainer>
    ) : (
        <h1>load...</h1>
    );
};

MangaPage.propTypes = {
    mangaName: PropTypes.string
};

export default MangaPage;
