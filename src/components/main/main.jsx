import React, { useEffect, useState } from "react";
import API from "../api";
import _ from "lodash";
import styles from "./main.module.css";
import ChapterCard from "../chapterCard/chapterCard";

const Main = () => {
  const { new_chapters } = styles;
  const [chapters, setChapters] = useState();

  useEffect(() => {
    API.product
      .getChapters()
      .then((data) => setChapters(_.orderBy(data, ["date"], ["desc"])));
  }, []);
  return (
    <div className={new_chapters}>
      {chapters && chapters.map((chapter) => <ChapterCard {...chapter} />)}
    </div>
  );
};

export default Main;
