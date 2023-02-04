import React, { useEffect, useState } from "react";
import API from "../../api";
import _ from "lodash";
import ChapterCard from "../../ui/chapterCard/chapterCard";
import Paginate from "../../utils/paginate";
import ContentContainer from "../../common/contentContainer";
import PaginationHOC from "../../ui/pagination/pagination";
import NavBar from "../../ui/navBar/navBar";
import Loader from "../../ui/loader/loader";
import SortBar from "../../ui/sortBar/sortBar";

const MainPage = () => {
    const [chapters, setChapters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [manga, setManga] = useState([]);
    const [updatedChapters, setUpdatedChapters] = useState([]);
    const count = chapters.length;
    const pageSize = 5;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateChapters = Paginate(chapters, currentPage, pageSize);

    useEffect(() => {
        API.chapters.getChapters().then((data) => {
            setChapters(_.orderBy(data, ["date"], ["desc"]));
            setCurrentPage(1);
        });
    }, []);

    useEffect(() => {
        if (paginateChapters.length !== 0) {
            const ids = [...new Set(paginateChapters.map((c) => c.mangaId))];
            API.product.getInfoByIds(ids).then((data) => setManga(data));
        }
    }, [currentPage]);

    useEffect(() => {
        if (manga.length !== 0) {
            setUpdatedChapters(
                paginateChapters.map((c) => {
                    const currManga = manga.find((m) => m.id === c.mangaId);
                    return {
                        ...c,
                        mangaName: currManga.name,
                        author: currManga.author,
                        category: currManga.category,
                        genres: currManga.genres
                    };
                })
            );
        }
    }, [manga]);

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    return (
        <>
            <NavBar />
            <ContentContainer>
                <div className="mx-1 my-3">
                    <SortBar
                        heading={"Последние добавленные"}
                        formVisible={false}
                    />
                </div>
                <div className="d-flex flex-column">
                    {updatedChapters ? (
                        updatedChapters.map((chapter) => (
                            <ChapterCard key={chapter.id} chapter={chapter} />
                        ))
                    ) : (
                        <Loader />
                    )}
                    <div className="m-auto">
                        <PaginationHOC
                            count={pagesCount}
                            onChange={handlePageChange}
                            page={currentPage}
                        />
                    </div>
                </div>
            </ContentContainer>
        </>
    );
};

export default MainPage;
