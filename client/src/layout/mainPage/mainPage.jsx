import React, { useState } from "react";
import _ from "lodash";
import ChapterCard from "../../components/ui/chapterCard/chapterCard";
import Paginate from "../../utils/paginate";
import ContentContainer from "../../components/common/contentContainer";
import PaginationHOC from "../../components/ui/pagination";
import NavBar from "../../components/ui/navBar/navBar";
import Loader from "../../components/ui/loader";
import SortBar from "../../components/ui/sortBar/sortBar";
import { useSelector } from "react-redux";
import { getMangaList } from "../../store/product";
import { getChaptersList } from "../../store/chapters";

const MainPage = () => {
    const manga = useSelector(getMangaList());
    const chapters = useSelector(getChaptersList());
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

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
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
                    {paginateChapters && paginateChapters.length !== 0 ? (
                        paginateChapters.map((chapter) => (
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
