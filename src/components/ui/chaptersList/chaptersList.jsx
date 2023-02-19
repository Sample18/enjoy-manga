import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListDropContainer from "../../common/listDropContainer/listDropContainer";
import { useChapters } from "../../../hooks/useChapters";

const ChaptersList = ({ id }) => {
    const { chapters } = useChapters();
    const getChaptersById = (id) => chapters.filter((c) => c.mangaId === id);
    const chaptersCrop = getChaptersById(id);

    return (
        <ListDropContainer>
            {chaptersCrop.map((c) => (
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
    );
};

ChaptersList.propTypes = {
    id: PropTypes.string
};

export default ChaptersList;
