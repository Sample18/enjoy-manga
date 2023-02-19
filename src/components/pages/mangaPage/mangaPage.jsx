import React from "react";
import PropTypes from "prop-types";
import ContentContainer from "../../common/contentContainer";
import ChaptersList from "../../ui/chaptersList/chaptersList";
import MangaPageDescription from "../../ui/mangaPageDescription/mangaPageDescription";
import Loader from "../../ui/loader/loader";
import Comments from "../../ui/comments/comments";
import { useProduct } from "../../../hooks/useProduct";

const MangaPage = ({ mangaName }) => {
    const { manga, isLoading } = useProduct();

    const getMangaByName = (name) => {
        if (!isLoading) {
            return manga.find(
                (m) => m.name.toLowerCase().replace(/ /g, "") === name
            );
        }
    };
    const mangaCrop = getMangaByName(mangaName);

    return (
        <ContentContainer>
            <div className="d-flex mb-4">
                {mangaCrop ? (
                    <img
                        src={"/" + mangaCrop.cover}
                        width="325"
                        height="450"
                        className="mx-4"
                    />
                ) : (
                    <Loader />
                )}
                <MangaPageDescription manga={mangaCrop} />
            </div>
            {mangaCrop ? <ChaptersList id={mangaCrop.id} /> : <Loader />}
            {mangaCrop ? <Comments id={mangaCrop.id} /> : <Loader />}
        </ContentContainer>
    );
};

MangaPage.propTypes = {
    mangaName: PropTypes.string
};

export default MangaPage;
