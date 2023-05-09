import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../components/ui/loader";
import { useDispatch, useSelector } from "react-redux";
import { getChaptersList } from "../store/chapters";
import { getCurrentUserData, updateUser } from "../store/users";

const ReaderContext = React.createContext();

export const useReader = () => {
    return useContext(ReaderContext);
};

const ReaderProvider = ({ children }) => {
    const chapters = useSelector(getChaptersList());
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const { mangaName, ch, page } = useParams();
    const history = useHistory();
    const pageData = getChapterImage(mangaName, ch, page);

    function addReadingProgress() {
        const userReading = currentUser.reading;

        if (userReading) {
            const findedId = userReading.find((id) => id === pageData.id);
            if (findedId) {
                return null;
            }
            return dispatch(
                updateUser({
                    ...currentUser,
                    reading: [...userReading, pageData.id]
                })
            );
        } else {
            return dispatch(
                updateUser({
                    ...currentUser,
                    reading: [...userReading, pageData.id]
                })
            );
        }
    }

    function getChapterImage(mangaId, chapter, page) {
        if (chapters) {
            const mangaChapter = chapters
                .filter((c) => c.mangaId === mangaId)
                .find((c) => c.number === chapter);
            return {
                img: mangaChapter.content[Number(page) - 1],
                content: mangaChapter.content,
                id: mangaChapter._id
            };
        }
    }

    function changeImage(e, imageNode) {
        if (imageNode === e.target) {
            const leftSideOfPage = document.documentElement.clientWidth / 2;
            const userClick = e.clientX;
            return leftSideOfPage < userClick
                ? imageChangeRight()
                : imageChangeLeft();
        }
        return history.push(`/reader/${mangaName}/${ch}/${e.target.value}`);
    }

    function imageChangeLeft() {
        history.push(
            `/reader/${mangaName}/${ch}/${
                Number(page) > 1 ? Number(page) - 1 : Number(page)
            }`
        );
    }

    function imageChangeRight() {
        history.push(
            `/reader/${mangaName}/${ch}/${
                Number(page) < pageData.content.length
                    ? Number(page) + 1
                    : Number(page)
            }`
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageData]);

    useEffect(() => {
        return () => addReadingProgress();
    }, []);

    return (
        <ReaderContext.Provider
            value={{
                pageData,
                imageChangeLeft,
                imageChangeRight,
                changeImage,
                page
            }}
        >
            {pageData ? children : <Loader />}
        </ReaderContext.Provider>
    );
};

ReaderProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ReaderProvider;
