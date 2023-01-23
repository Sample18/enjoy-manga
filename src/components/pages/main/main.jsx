import React, { useEffect, useState } from "react";
import API from "../../api";
import _ from "lodash";
import ChapterCard from "../../ui/chapterCard/chapterCard";
import Paginate from "../../utils/paginate";
import ContentContainer from "../../common/contentContainer";
import PaginationHOC from "../../ui/pagination/pagination";

const Main = () => {
    const [chapters, setChapters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const count = chapters.length;
    const pageSize = 5;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateChapters = Paginate(chapters, currentPage, pageSize);

    useEffect(() => {
        API.product
            .getChapters()
            .then((data) => setChapters(_.orderBy(data, ["date"], ["desc"])));
    }, []);

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    return (
        <ContentContainer>
            <div className="d-flex flex-column">
                {chapters &&
                    paginateChapters.map((chapter) => (
                        <ChapterCard key={chapter.id} {...chapter} />
                    ))}
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
