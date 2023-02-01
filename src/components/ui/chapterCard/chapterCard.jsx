import React from "react";
import styles from "./chapterCard.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ChapterCardDescription from "../chapterCardDescription/ChapterCardDescription";

const ChapterCard = ({ chapter }) => {
    const { chapterCover, imageCover } = styles;
    const toReader = `/reader/${chapter.mangaName
        .toLowerCase()
        .replace(/ /g, "")}/${chapter.number}/1`;
    return (
        <div
            className={
                "w-100 d-flex mb-4 border border-dark rounded-3 px-3 " +
                chapterCover
            }
        >
            <div className={"d-flex align-items-center me-3 " + imageCover}>
                <Link to={toReader} className="page-link">
                    <img
                        className="img-fluid"
                        src={chapter.content[0]}
                        alt="berserk"
                    />
                </Link>
            </div>
            <ChapterCardDescription chapter={chapter} />
        </div>
    );
};

ChapterCard.propTypes = {
    chapter: PropTypes.object
};

export default ChapterCard;
