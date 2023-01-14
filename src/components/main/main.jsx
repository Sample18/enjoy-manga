import React, { useEffect, useState } from "react";
import API from "../api";
import _ from "lodash";
import ChapterCard from "../chapterCard/chapterCard";
// import Pagination from "../pagination/pagination";
import Paginate from "../utils/paginate";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import styles from "./main.module.css";

const Main = () => {
    const [chapters, setChapters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const count = chapters.length;
    const pageSize = 5;
    const paginateChapters = Paginate(chapters, currentPage, pageSize);

    const theme = createTheme({
        palette: {
            neutral: {
                main: "#fff",
                contrastText: "#fff"
            }
        }
    });

    useEffect(() => {
        API.product
            .getChapters()
            .then((data) => setChapters(_.orderBy(data, ["date"], ["desc"])));
    }, []);

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    return (
        <div className="container d-flex flex-column px-1 py-4 bg-dark">
            {chapters &&
                paginateChapters.map((chapter) => (
                    <ChapterCard key={chapter.id} {...chapter} />
                ))}
            {/* <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onChange={handlePageChange}
                currentPage={currentPage}
            /> */}
            <div className="m-auto">
                <ThemeProvider theme={theme}>
                    <Pagination
                        count={Math.ceil(count / pageSize)}
                        onChange={handlePageChange}
                        page={currentPage}
                        shape="rounded"
                        variant="outlined"
                        hidePrevButton
                        hideNextButton
                        size="large"
                        color="neutral"
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default Main;
