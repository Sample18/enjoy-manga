import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import productService from "../services/product.service";
import { toast } from "react-toastify";

const ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
    const [manga, setManga] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getManga();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getManga() {
        try {
            const { content } = await productService.get();
            setManga(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getMangaByName(name) {
        return manga.find(
            (m) => m.name.toLowerCase().replace(/ /g, "") === name
        );
    }

    function getMangaListById(ids) {
        return ids.map((id) => manga.find((m) => m.id === id));
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <ProductContext.Provider
            value={{
                manga,
                isLoading,
                getMangaByName,
                getMangaListById
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductProvider;
