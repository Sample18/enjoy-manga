import React, { useState } from "react";
import MangaCard from "../../ui/mangaCard/mangaCard";
import Paginate from "../../../utils/paginate";
import ContentContainer from "../../common/contentContainer";
import PaginationHOC from "../../ui/pagination/pagination";
import SortBar from "../../ui/sortBar/sortBar";
import _ from "lodash";
import Loader from "../../ui/loader/loader";
import { useProduct } from "../../../hooks/useProduct";
// import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    const { manga } = useProduct();
    const [currentPage, setCurrentPage] = useState(1);
    const sortOn = ["алфавиту", "популярности"];
    const [value, setValue] = useState(sortOn[0]);
    const count = manga.length;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateManga = Paginate(manga, currentPage, pageSize);

    const sortBy = () => {
        if (value === "алфавиту") return { field: "name", order: "asc" };
        if (value === "популярности") return { field: "rate", order: "desc" };
    };

    const sortedManga = _.orderBy(
        paginateManga,
        [sortBy().field],
        [sortBy().order]
    );

    // const handleDelete = (id) => {
    //     const filtred = mangas.filter((m) => m.id !== id);
    //     setMangas(filtred);
    // };

    // const handleFavourite = (id) => {
    //     const mIndex = mangas.findIndex((m) => m.id === id);
    //     const favManga = JSON.parse(JSON.stringify(mangas));
    //     favManga[mIndex].favourite = !favManga[mIndex].favourite;
    //     setMangas(favManga);
    // };

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
                    sortedManga.map((m) => <MangaCard manga={m} key={m.id} />)
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
