import React, { useEffect, useState } from "react";
import API from "../api";
import _ from "lodash";
import ChapterCard from "../chapterCard/chapterCard";
// import styles from "./main.module.css";

const Main = () => {
    const [chapters, setChapters] = useState();

    useEffect(() => {
        API.product
            .getChapters()
            .then((data) => setChapters(_.orderBy(data, ["date"], ["desc"])));
    }, []);
    return (
        <div className="container d-flex flex-column px-1 py-4 bg-dark">
            {chapters &&
                chapters.map((chapter) => (
                    <ChapterCard key={chapter.id + chapter.name} {...chapter} />
                ))}
        </div>
    );
};

export default Main;
