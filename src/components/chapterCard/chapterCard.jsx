import React from "react";
import styles from "./chapterCard.module.css";
import PropTypes from "prop-types";

const ChapterCard = ({
    name,
    content,
    author,
    mangaName,
    category,
    genres
}) => {
    const {
        chapter,
        imageCover,
        bg
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
            <div className="container p-0 text-white">
                <h1 className="border-bottom border-dark m-2">{name}</h1>
                <h4 className="border-bottom border-dark m-2">
                    Автор: {author}
                </h4>
                <h4 className="border-bottom border-dark m-2">
                    Серия: {mangaName}
                </h4>
                <h4 className="border-bottom border-dark m-2">
                    Категории: {category}
                </h4>
                <h4 className="border-bottom border-dark m-2">
                    Теги:
                    {genres.map((tag) => (
                        <span key={tag.id} className={"badge mx-1 mb-1 " + bg}>
                            {tag.name}
                        </span>
                    ))}
                </h4>
            </div>
        </div>
    );
};

ChapterCard.propTypes = {
    name: PropTypes.string,
    content: PropTypes.array,
    author: PropTypes.string,
    mangaName: PropTypes.string,
    category: PropTypes.string,
    genres: PropTypes.array
};

export default ChapterCard;
