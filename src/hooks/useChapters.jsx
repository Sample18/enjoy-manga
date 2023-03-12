import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import chaptersService from "../services/chapters.service";
import { toast } from "react-toastify";

const ChaptersContext = React.createContext();

export const useChapters = () => {
    return useContext(ChaptersContext);
};

const ChaptersProvider = ({ children }) => {
    const [chapters, setChapters] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getChapters();
        setLoading(false);
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getChapters() {
        try {
            const { content } = await chaptersService.get();
            setChapters(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function uploadChapter(chapter) {
        try {
            const { content } = await chaptersService.upload(chapter);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    }

    function updateChapters(manga) {
        if (manga.length !== 0) {
            return chapters.map((c) => {
                const currManga = manga.find((m) => m.id === c.mangaId);
                return {
                    ...c,
                    mangaName: currManga.name,
                    author: currManga.author,
                    category: currManga.category,
                    genres: currManga.genres
                };
            });
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <ChaptersContext.Provider
            value={{ chapters, isLoading, updateChapters, uploadChapter }}
        >
            {children}
        </ChaptersContext.Provider>
    );
};

ChaptersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ChaptersProvider;
