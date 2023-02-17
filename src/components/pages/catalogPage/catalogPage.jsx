import React, { useEffect, useState } from "react";
import API from "../../api";
import MangaCard from "../../ui/mangaCard/mangaCard";
import Paginate from "../../../utils/paginate";
import ContentContainer from "../../common/contentContainer";
import PaginationHOC from "../../ui/pagination/pagination";
import SortBar from "../../ui/sortBar/sortBar";
import _ from "lodash";
import Loader from "../../ui/loader/loader";
// import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    const [mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const sortOn = ["алфавиту", "популярности"];
    const [value, setValue] = useState(sortOn[0]);
    const count = mangas.length;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateManga = Paginate(mangas, currentPage, pageSize);

    useEffect(() => {
        API.product.fetchAll().then((data) => setMangas(data));
    }, []);

    const sortBy = () => {
        if (value === "алфавиту") return "name";
        if (value === "популярности") return "rate";
    };

    const sortedManga = _.orderBy(paginateManga, [sortBy()], ["asc"]);

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

    const handleChange = ({ target }) => {
        return setValue(target.value);
    };

    return (
        <ContentContainer>
            <div className="mx-1 my-3">
                <SortBar
                    heading={"Каталог"}
                    onChange={handleChange}
                    sortOn={sortOn}
                />
            </div>
            <div className="d-flex flex-wrap">
                {sortedManga ? (
                    sortedManga.map((manga) => (
                        <MangaCard
                            manga={manga}
                            key={manga.id}
                            deleteManga={handleDelete}
                            toFavourite={handleFavourite}
                        />
                    ))
                ) : (
                    <Loader />
                )}
            </div>
            {pagesCount !== 1 && (
                <div className="d-flex justify-content-center">
                    <PaginationHOC
                        count={pagesCount}
                        onChange={handlePageChange}
                        page={currentPage}
                    />
                </div>
            )}
        </ContentContainer>
    );
};

export default CatalogPage;
