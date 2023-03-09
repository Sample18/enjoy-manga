import React from "react";
import PropTypes from "prop-types";
import ContentContainer from "../../common/contentContainer";
import ChaptersList from "../../ui/chaptersList/chaptersList";
import MangaPageDescription from "../../ui/mangaPageDescription/mangaPageDescription";
import Loader from "../../ui/loader/loader";
import Comments from "../../ui/comments/comments";
import { useProduct } from "../../../hooks/useProduct";
import styles from "./mangaPage.module.css";

const MangaPage = ({ mangaName }) => {
    const { getMangaByName } = useProduct();
    const mangaCrop = getMangaByName(mangaName);
    const { coverImage } = styles;

    return (
        <ContentContainer>
            {mangaCrop ? (
                <>
                    <div className="d-flex mb-4">
                        <img
                            src={"/" + mangaCrop.cover}
                            className={"mx-4 " + coverImage}
                        />
                        <MangaPageDescription manga={mangaCrop} />
                    </div>
                    <ChaptersList id={mangaCrop.id} />
                    <Comments id={mangaCrop.id} />
                </>
            ) : (
                <Loader />
            )}
        </ContentContainer>
    );
};

MangaPage.propTypes = {
    mangaName: PropTypes.string
};

export default MangaPage;
