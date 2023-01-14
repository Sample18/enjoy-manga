import React from "react";
import styles from "./chapterCard.module.css";
import PropTypes from "prop-types";

const ChapterCard = ({ name, content }) => {
    const {
        chapter,
        imageCover
        // chImage,
        // ch_description,
        // ch_name,
        // ch_auth,
        // ch_series,
        // ch_category,
        // ch_tags,
        // image
    } = styles;
    return (
        <div
            className={
                "w-100 d-flex mb-4 border border-dark rounded-3 px-3 " + chapter
            }
        >
            <div className={"d-flex align-items-center me-3 " + imageCover}>
                <img className="img-fluid" src={content[0]} alt="berserk" />
            </div>
            <div className="container p-0">
                <h1 className="border-bottom border-dark m-0">{name}</h1>
                <h2 className="border-bottom border-dark m-0">Автор</h2>
                <h3 className="border-bottom border-dark m-0">Серия</h3>
                <h3 className="border-bottom border-dark m-0">Категории</h3>
                <h3 className="border-bottom border-dark m-0">Теги</h3>
            </div>
        </div>
    );
};

ChapterCard.propTypes = {
    name: PropTypes.string,
    content: PropTypes.array
};

export default ChapterCard;
