import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../../common/contentContainer";
import _ from "lodash";
import styles from "./genresPage.module.css";
import Paginate from "../../../utils/paginate";
import PaginationHOC from "../../ui/pagination";
import SortBar from "../../ui/sortBar/sortBar";
import { useSelector } from "react-redux";
import { getGenresList } from "../../../store/genres";

const GenresPage = () => {
    const { genresWrap, nameWrap } = styles;
    const genres = useSelector(getGenresList());
    const [currentPage, setCurrentPage] = useState(1);
    const sortOn = ["алфавиту", "популярности"];
    const [value, setValue] = useState(sortOn[0]);
    const count = genres ? genres.length : 1;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateGenres = Paginate(genres, currentPage, pageSize);

    const sortBy = () => {
        if (value === "алфавиту") return "nameRu";
        if (value === "популярности") return "rate";
    };

    const sortedGenres = _.orderBy(paginateGenres, [sortBy()], ["asc"]);

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    const handleChange = ({ target }) => {
        return setValue(target.value);
    };

    return (
        <>
            <ContentContainer>
                <div>
                    <div className="mx-1 my-3">
                        <SortBar
                            heading={"Жанры"}
                            onChange={handleChange}
                            sortOn={sortOn}
                        />
                    </div>
                    <ul
                        className={`d-flex flex-column flex-wrap m-0 p-0 ${genresWrap}`}
                    >
                        {sortedGenres &&
                            sortedGenres.map((g) => (
                                <li
                                    key={g.id}
                                    className={`text-white m-1 p-0 rounded-3 d-flex align-items-center justify-content-center ${nameWrap}`}
                                >
                                    <Link
                                        to={`genres/${g.name}`}
                                        className="page-link fs-3"
                                    >
                                        {g.nameRu}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                    {pagesCount !== 1 && (
                        <div className="d-flex justify-content-center">
                            <PaginationHOC
                                count={pagesCount}
                                onChange={handlePageChange}
                                page={currentPage}
                            />
                        </div>
                    )}
                </div>
            </ContentContainer>
        </>
    );
};

export default GenresPage;
