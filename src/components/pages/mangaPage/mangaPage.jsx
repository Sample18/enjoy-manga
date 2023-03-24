import React from "react";
import PropTypes from "prop-types";
import ContentContainer from "../../common/contentContainer";
import ChaptersList from "../../ui/chaptersList/chaptersList";
import MangaPageDescription from "../../ui/mangaPageDescription";
import Loader from "../../ui/loader";
import Comments from "../../ui/comments";
import styles from "./mangaPage.module.css";
import { useSelector } from "react-redux";
import { getMangaByName } from "../../../store/product";
import BackButton from "../../common/backButton";

const MangaPage = ({ mangaName }) => {
    const mangaCrop = useSelector(getMangaByName(mangaName));
    const { coverImage } = styles;

    return (
        <ContentContainer>
            <BackButton />
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
