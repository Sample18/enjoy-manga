import React, { useState } from "react";
import MangaCard from "../ui/mangaCard";
import Paginate from "../../utils/paginate";
import ContentContainer from "../common/contentContainer";
import SortBar from "../ui/sortBar";
import _ from "lodash";
import Loader from "../ui/loader";
import { getAcceptedMangaList } from "../../store/product";
import { useSelector } from "react-redux";
import PaginationHOC from "../hoc/pagination";

const CatalogPage = () => {
    const manga = useSelector(getAcceptedMangaList());
    const [currentPage, setCurrentPage] = useState(1);
    const sortOn = ["алфавиту", "популярности"];
    const [value, setValue] = useState(sortOn[0]);
    const count = manga ? manga.length : 1;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateManga = manga ? Paginate(manga, currentPage, pageSize) : null;

    const sortBy = () => {
        if (value === "алфавиту") return { field: "name", order: "asc" };
        if (value === "популярности") return { field: "rate", order: "desc" };
    };

    const sortedManga = _.orderBy(
        paginateManga,
        [sortBy().field],
        [sortBy().order]
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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
                    sortedManga.map((m) => <MangaCard manga={m} key={m._id} />)
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
