import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";
import ContentContainer from "../../common/contentContainer";
import _ from "lodash";
import styles from "./genresPage.module.css";
import Paginate from "../../utils/paginate";
import PaginationHOC from "../../ui/pagination/pagination";
import SortBar from "../../ui/sortBar/sortBar";

const GenresPage = () => {
    const { genresWrap, nameWrap } = styles;
    const [genres, setGenres] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const count = Object.keys(genres).length;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateGenres = Paginate(genres, currentPage, pageSize);
    const sortedGenres = _.orderBy(paginateGenres, ["nameRu"], ["asc"]);

    useEffect(() => {
        API.genres.fetchAll().then((data) => setGenres(data));
    }, []);

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    return (
        <>
            <ContentContainer>
                <div>
                    <div className="mx-1 my-3">
                        <SortBar heading={"Жанры"} />
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
