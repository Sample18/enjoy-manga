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
import { getCurrentUserData, updateUser } from "../../../store/users";
import { getCommentsList, loadCommentsList } from "../../../store/comments";
import Favorites from "../../ui/favorites";

const MangaPage = ({ mangaName }) => {
    const mangaCrop = useSelector(getMangaByName(mangaName));
    const currentUser = useSelector(getCurrentUserData());
    const comments = useSelector(getCommentsList());
    const dispatch = useDispatch();
    const { coverImage } = styles;

    useEffect(() => {
        if (mangaCrop) {
            dispatch(loadCommentsList(mangaCrop.id));
        }
    }, [mangaCrop]);

    const handleClick = () => {
        let favorites;
        if (currentUser.favorites) {
            const favIndex = currentUser.favorites.findIndex(
                (f) => f === mangaCrop.id
            );
            if (favIndex === -1) {
                favorites = [...currentUser.favorites, mangaCrop.id];
            } else {
                favorites = currentUser.favorites.filter(
                    (f, i) => i !== favIndex
                );
            }
        } else {
            favorites = [mangaCrop.id];
        }

        dispatch(updateUser({ ...currentUser, favorites }));
    };

    const favoriteCheck = () => {
        if (currentUser.favorites) {
            const favIndex = currentUser.favorites.findIndex(
                (f) => f === mangaCrop.id
            );
            if (favIndex === -1) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

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
                        <div>
                            <MangaPageDescription manga={mangaCrop} />
                            {currentUser && (
                                <Favorites
                                    onClick={handleClick}
                                    isFav={favoriteCheck()}
                                />
                            )}
                        </div>
                    </div>
                    <ChaptersList id={mangaCrop.id} />
                    <Comments comments={comments} />
                    {currentUser && (
                        <CommentsForm
                            id={mangaCrop.id}
                            userId={currentUser.id}
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
