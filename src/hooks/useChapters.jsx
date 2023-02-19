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

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <ChaptersContext.Provider value={{ chapters, isLoading }}>
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
