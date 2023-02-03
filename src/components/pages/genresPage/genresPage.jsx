import React, { useEffect, useState } from "react";
import API from "../../api";
import ContentContainer from "../../common/contentContainer";
import _ from "lodash";
import styles from "./genresPage.module.css";
import Paginate from "../../utils/paginate";
import PaginationHOC from "../../ui/pagination/pagination";
import NavBar from "../../ui/navBar/navBar";

const GenresPage = () => {
    const { genresWrap, nameWrap } = styles;
    const [genres, setGenres] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const count = Object.keys(genres).length;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateGenres = Paginate(genres, currentPage, pageSize);

    useEffect(() => {
        API.genres
            .fetchAll()
            .then((data) => setGenres(_.orderBy(data, ["name"], ["asc"])));
    }, []);

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    return (
        <>
            <NavBar />
            <ContentContainer>
                <div>
                    <ul
                        className={`d-flex flex-column flex-wrap m-0 p-0 ${genresWrap}`}
                    >
                        {paginateGenres &&
                            paginateGenres.map((g) => (
                                <li
                                    key={g.id}
                                    className={`text-white m-1 p-0 rounded-3 ${nameWrap}`}
                                >
                                    {g.name}
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
