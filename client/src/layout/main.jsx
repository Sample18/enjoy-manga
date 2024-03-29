import React, { useState } from "react";
import _ from "lodash";
import ChapterCard from "../components/ui/chapterCard";
import Paginate from "../utils/paginate";
import ContentContainer from "../components/common/contentContainer";
import PaginationHOC from "../components/hoc/pagination";
import Loader from "../components/ui/loader";
import SortBar from "../components/ui/sortBar";
import { useSelector } from "react-redux";
import { getMangaList } from "../store/product";
import { getAcceptedChaptersList } from "../store/chapters";

const Main = () => {
    const manga = useSelector(getMangaList());
    const chapters = useSelector(getAcceptedChaptersList());
    const [currentPage, setCurrentPage] = useState(1);
    const count = chapters ? chapters.length : 1;
    const pageSize = 5;
    const pagesCount = Math.ceil(count / pageSize);
    const sortedChapters = _.orderBy(
        updateChapters(manga, chapters),
        ["date"],
        ["desc"]
    );
    const paginateChapters = Paginate(sortedChapters, currentPage, pageSize);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    function updateChapters(manga, chapters) {
        if (manga && chapters) {
            return chapters.map((c) => {
                const currManga = manga.find((m) => m._id === c.mangaId);
                return {
                    ...c,
                    mangaName: currManga.name,
                    author: currManga.author,
                    category: currManga.category,
                    genres: currManga.genres
                };
            });
        }
    }

    return (
        <ContentContainer>
            <div className="mx-1 my-3">
                <SortBar
                    heading={"Последние добавленные"}
                    formVisible={false}
                />
            </div>
            <div className="d-flex flex-column">
                {paginateChapters && paginateChapters.length !== 0 ? (
                    paginateChapters.map((chapter) => (
                        <ChapterCard key={chapter._id} chapter={chapter} />
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
    );
};

export default Main;
