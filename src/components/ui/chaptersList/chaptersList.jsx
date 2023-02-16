import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListDropContainer from "../../common/listDropContainer/listDropContainer";
import Loader from "../loader/loader";

const ChaptersList = ({ chapters }) => {
    return chapters ? (
        <ListDropContainer>
            {chapters.map((c) => (
                <p
                    key={c.id}
                    className="border-bottom border-dark m-0 p-2 text-white pe-auto"
                >
                    <Link
                        className="page-link"
                        to={`/reader/${c.mangaId}/${c.number}/1`}
                    >
                        {c.name}
                    </Link>
                </p>
            ))}
        </ListDropContainer>
    ) : (
        <Loader />
    );
};

ChaptersList.propTypes = {
    chapters: PropTypes.array
};

export default ChaptersList;
