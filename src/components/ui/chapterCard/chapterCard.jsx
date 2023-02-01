import React from "react";
import styles from "./chapterCard.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ChapterCard = ({
    name,
    content,
    author,
    mangaName,
    category,
    genres,
    number
}) => {
    const { chapter, imageCover, bg } = styles;
    const toReader = `/reader/${mangaName
        .toLowerCase()
        .replace(/ /g, "")}/${number}/1`;
    return (
        <div
            className={
                "w-100 d-flex mb-4 border border-dark rounded-3 px-3 " + chapter
            }
        >
            <div className={"d-flex align-items-center me-3 " + imageCover}>
                <Link to={toReader} className="page-link">
                    <img className="img-fluid" src={content[0]} alt="berserk" />
                </Link>
            </div>
            <div className="container p-0 text-white">
                <h1 className="border-bottom border-dark m-2">
                    <Link to={toReader} className="page-link">
                        {name}
                    </Link>
                </h1>
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
    genres: PropTypes.array,
    number: PropTypes.string
};

export default ChapterCard;
