import React, { useEffect, useState } from "react";
import API from "../../api";
import MangaCard from "../../ui/mangaCard/mangaCard";
import Paginate from "../../utils/paginate";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContentContainer from "../../common/contentContainer";
// import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    const [mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const count = mangas.length;
    const pageSize = 10;
    const paginateManga = Paginate(mangas, currentPage, pageSize);

    const theme = createTheme({
        palette: {
            neutral: {
                main: "#fff",
                contrastText: "#fff"
            }
        }
    });
    useEffect(() => {
        API.product.fetchAll().then((data) => setMangas(data));
    }, []);

    const handleDelete = (id) => {
        const filtred = mangas.filter((m) => m.id !== id);
        setMangas(filtred);
    };

    const handleFavourite = (id) => {
        const mIndex = mangas.findIndex((m) => m.id === id);
        const favManga = JSON.parse(JSON.stringify(mangas));
        favManga[mIndex].favourite = !favManga[mIndex].favourite;
        setMangas(favManga);
    };

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    const countPages = () => {
        return Math.ceil(count / pageSize);
    };

    return (
        <ContentContainer>
            <div className="d-flex flex-wrap">
                {mangas &&
                    paginateManga.map((manga) => (
                        <MangaCard
                            manga={manga}
                            key={manga.id}
                            deleteManga={handleDelete}
                            toFavourite={handleFavourite}
                        />
                    ))}
            </div>
            {countPages() !== 1 && (
                <div className="d-flex justify-content-center">
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={countPages()}
                            onChange={handlePageChange}
                            page={currentPage}
                            shape="rounded"
                            variant="outlined"
                            hidePrevButton
                            hideNextButton
                            size="large"
                            color="neutral"
                        />
                    </ThemeProvider>
                </div>
            )}
        </ContentContainer>
    );
};

export default CatalogPage;
