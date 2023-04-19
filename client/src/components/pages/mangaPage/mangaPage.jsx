import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ContentContainer from "../../common/contentContainer";
import ChaptersList from "../../ui/chaptersList/chaptersList";
import MangaPageDescription from "../../ui/mangaPageDescription";
import Loader from "../../ui/loader";
import Comments from "../../ui/comments";
import styles from "./mangaPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getMangaByName } from "../../../store/product";
import BackButton from "../../common/backButton";
import CommentsForm from "../../ui/forms/commentsForm";
import { getCurrentUserData, getIsLoggedIn } from "../../../store/users";
import { getCommentsList, loadCommentsList } from "../../../store/comments";
import Favorites from "../../ui/favorites";

const MangaPage = ({ mangaName }) => {
    const mangaCrop = useSelector(getMangaByName(mangaName));
    const isLogin = useSelector(getIsLoggedIn());
    const currentUser = isLogin ? useSelector(getCurrentUserData()) : null;
    const comments = useSelector(getCommentsList());
    const dispatch = useDispatch();
    const { coverImage } = styles;

    useEffect(() => {
        if (mangaCrop) {
            dispatch(loadCommentsList(mangaCrop._id));
        }
    }, [mangaCrop]);

    return (
        <ContentContainer>
            <BackButton />
            {mangaCrop ? (
                <>
                    <div className="d-flex mb-4">
                        <img
                            src={mangaCrop.cover}
                            className={"mx-4 " + coverImage}
                            alt={mangaCrop.cover + " cover"}
                        />
                        <div className="mx-4">
                            <MangaPageDescription manga={mangaCrop} />
                            {currentUser && (
                                <Favorites
                                    currentUser={currentUser}
                                    mangaCrop={mangaCrop}
                                />
                            )}
                        </div>
                    </div>
                    <ChaptersList id={mangaCrop._id} />
                    <Comments comments={comments} />
                    {currentUser && (
                        <CommentsForm
                            id={mangaCrop._id}
                            userId={currentUser._id}
                        />
                    )}
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
