import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListDropContainer from "../../common/listDropContainer/listDropContainer";

const ChaptersList = ({ chapters }) => {
    return (
        <ListDropContainer>
            {chapters.map((c) => (
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
        </ListDropContainer>
    );
};

ChaptersList.propTypes = {
    chapters: PropTypes.array
};

export default ChaptersList;
