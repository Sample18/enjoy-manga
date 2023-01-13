import React from "react";
import styles from "./chapterCard.module.css";

const ChapterCard = ({ name, content }) => {
  const {
    chapter,
    image_cover,
    ch_image,
    ch_description,
    ch_name,
    ch_auth,
    ch_series,
    ch_category,
    ch_tags,
    image,
  } = styles;
  return (
    <div className={chapter}>
      <div className={image_cover}>
        <div className={ch_image}>
          <img
            className={image}
            src={content[0]}
            height="120px"
            alt="berserk"
          />
        </div>
      </div>
      <div className={ch_description}>
        <h1 className={ch_name}>{name}</h1>
        <h2 className={ch_auth}>Автор</h2>
        <h3 className={ch_series}>Серия</h3>
        <h3 className={ch_category}>Категории</h3>
        <h3 className={ch_tags}>Теги</h3>
      </div>
    </div>
  );
};

export default ChapterCard;
