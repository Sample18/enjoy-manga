import React, { useState } from "react";
// import API from "../../api";
import _ from "lodash";
import ChapterCard from "../../ui/chapterCard/chapterCard";
import Paginate from "../../../utils/paginate";
import ContentContainer from "../../common/contentContainer";
import PaginationHOC from "../../ui/pagination/pagination";
import NavBar from "../../ui/navBar/navBar";
import Loader from "../../ui/loader/loader";
import SortBar from "../../ui/sortBar/sortBar";
import { useChapters } from "../../../hooks/useChapters";
import { useProduct } from "../../../hooks/useProduct";

const MainPage = () => {
    const { chapters, updateChapters } = useChapters();
    const { manga } = useProduct();
    const [currentPage, setCurrentPage] = useState(1);
    const count = chapters.length;
    const pageSize = 5;
    const pagesCount = Math.ceil(count / pageSize);
    const sortedChapters = _.orderBy(updateChapters(manga), ["date"], ["desc"]);
    const paginateChapters = Paginate(sortedChapters, currentPage, pageSize);

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
