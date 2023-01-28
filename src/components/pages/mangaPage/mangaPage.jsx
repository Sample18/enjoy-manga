import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";
import { useHistory } from "react-router-dom";
import ContentContainer from "../../common/contentContainer";
import ChaptersList from "../../ui/chaptersList/chaptersList";

const MangaPage = ({ mangaName }) => {
    const [manga, setManga] = useState({});
    const [genres, setGenres] = useState([]);
    const [chapters, setChapters] = useState([]);
    const history = useHistory();

    useEffect(() => {
        API.product.getByName(mangaName).then((data) => setManga(data));
    }, []);

    useEffect(() => {
        if (typeof manga === "undefined") return history.push("/404");
        setGenres(manga.genres);
        setChapters(manga.chapters);
    }, [manga]);

    return manga ? (
        <ContentContainer>
            <div className="d-flex mb-4">
                <img
                    src={"/" + manga.cover}
                    width="325"
                    height="450"
                    className="mx-4"
                />
                <div>
                    <h1 className="text-white">
                        <span style={{ color: "#999" }}>{manga.name}</span> /{" "}
                        <span>{manga.nameRu}</span>
                    </h1>
                    <h4 className="text-white">
                        Автор:
                        <span className="mx-2" style={{ color: "#999" }}>
                            {manga.author}
                        </span>
                    </h4>
                    <h4 className="text-white">
                        Категория:
                        <span className="mx-2" style={{ color: "#999" }}>
                            {manga.category}
                        </span>
                    </h4>
                    <h4 className="text-white">
                        Жанры:
                        {genres &&
                            genres.map((tag, i) => (
                                <span
                                    key={tag.id}
                                    className="mx-2"
                                    style={{ color: "#999" }}
                                >
                                    {tag.name}
                                    {i === genres.length - 1 ? "" : ","}
                                </span>
                            ))}
                    </h4>
                    <h4 className="text-white">Описание:</h4>
                    <p style={{ color: "#999" }}>{manga.description}</p>
                </div>
            </div>
            <ChaptersList chapters={chapters} />
        </ContentContainer>
    ) : (
        <h1>load...</h1>
    );
};

MangaPage.propTypes = {
    mangaName: PropTypes.string
};

export default MangaPage;
