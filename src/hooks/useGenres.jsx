import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import genresService from "../services/genres.service";
import { toast } from "react-toastify";

const GenresContext = React.createContext();

export const useGenres = () => {
    return useContext(GenresContext);
};

const GenresProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getGenres();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getGenres() {
        try {
            const { content } = await genresService.get();
            setGenres(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getGenreById(id) {
        return genres.find((g) => g.id === id);
    }

    function getGenreByName(name) {
        return genres.find((g) => g.name === name);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <GenresContext.Provider
            value={{ genres, isLoading, getGenreByName, getGenreById }}
        >
            {children}
        </GenresContext.Provider>
    );
};

GenresProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default GenresProvider;
