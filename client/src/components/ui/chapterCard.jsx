import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ChapterCardDescription from "./ChapterCardDescription";

const ChapterCard = ({ chapter }) => {
    return (
        <div className="w-100 d-flex mb-4 border border-dark rounded-3 px-3 bg-black">
            <Link
                to={`/reader/${chapter.mangaId}/${chapter.number}/1`}
                className="page-link"
            >
                <div className="d-flex align-items-center me-3 imageCover">
                    <img
                        className="m-2 topImage"
                        src={chapter.content[0]}
                        alt={chapter.name + " cover"}
                    />
                    <img
                        className="m-2 bottomImage"
                        src={chapter.content[1]}
                        alt={chapter.name + " cover2"}
                    />
                </div>
            </Link>

            <ChapterCardDescription chapter={chapter} />
        </div>
    );
};

ChapterCard.propTypes = {
    chapter: PropTypes.object
};

export default ChapterCard;
