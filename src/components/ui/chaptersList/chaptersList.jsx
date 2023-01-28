import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./chaptersList.module.css";
import { Link } from "react-router-dom";

const ChaptersList = ({ chapters }) => {
    const [collapsible, setCollapsible] = useState(false);
    const { collapsWrapper, content, collapsContent } = styles;
    return (
        <div className={collapsWrapper + " w-50 m-auto rounded-3"}>
            <div
                className={
                    collapsible ? collapsContent + " px-3" : content + " px-3"
                }
            >
                {chapters &&
                    chapters.map((c) => (
                        <p
                            key={c.id}
                            className="border-bottom border-dark m-0 p-2 text-white pe-auto"
                        >
                            <Link
                                className="page-link"
                                to={`/reader/${c.mangaName
                                    .toLowerCase()
                                    .replace(/ /g, "")}/${c.number}/1`}
                            >
                                {c.name}
                            </Link>
                        </p>
                    ))}
            </div>
            <button
                className="btn btn-secondary w-100 mt-3"
                onClick={() => setCollapsible((prevState) => !prevState)}
            >
                {collapsible ? "Свернуть" : "Развернуть"}
            </button>
        </div>
    );
};

ChaptersList.propTypes = {
    chapters: PropTypes.array
};

export default ChaptersList;
