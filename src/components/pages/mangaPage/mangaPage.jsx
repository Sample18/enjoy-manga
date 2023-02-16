import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";
import { useHistory } from "react-router-dom";
import ContentContainer from "../../common/contentContainer";
import ChaptersList from "../../ui/chaptersList/chaptersList";
import _ from "lodash";
import MangaPageDescription from "../../ui/mangaPageDescription/mangaPageDescription";
import Loader from "../../ui/loader/loader";

const MangaPage = ({ mangaName }) => {
    const [manga, setManga] = useState([]);
    const [genres, setGenres] = useState([]);
    const [chapters, setChapters] = useState();
    const history = useHistory();

    useEffect(() => {
        API.product.getByName(mangaName).then((data) => setManga(data));
    }, []);

    useEffect(() => {
        if (typeof manga === "undefined") return history.push("/404");
        setGenres(manga.genres);
        API.chapters
            .getChaptersById(manga.id)
            .then((data) => setChapters(_.orderBy(data, ["number"], ["desc"])));
    }, [manga]);

    return (
        <ContentContainer>
            <div className="d-flex mb-4">
                {manga.length !== 0 ? (
                    <img
                        src={"/" + manga.cover}
                        width="325"
                        height="450"
                        className="mx-4"
                    />
                ) : (
                    <Loader />
                )}
                <MangaPageDescription manga={manga} genres={genres} />
            </div>
            <ChaptersList chapters={chapters} />
        </ContentContainer>
    );
};

MangaPage.propTypes = {
    mangaName: PropTypes.string
};

export default MangaPage;
