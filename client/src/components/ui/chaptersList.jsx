import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListDropContainer from "../common/listDropContainer";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getChaptersById } from "../../store/chapters";

const ChaptersList = ({ id }) => {
    const chaptersCrop = _.orderBy(
        useSelector(getChaptersById(id)),
        "number",
        "desc"
    );

    return chaptersCrop.length !== 0 ? (
        <ListDropContainer>
            {chaptersCrop.map((c) => (
                <p
                    key={c._id}
                    className="border-bottom border-dark m-0 p-2 text-white pe-auto"
                >
                    <Link
                        className="page-link"
                        to={`/reader/${c.mangaId}/${c.number}/1`}
                    >
                        {c.number} - {c.name}
                    </Link>
                </p>
            ))}
        </ListDropContainer>
    ) : (
        <div className="w-50 m-auto mb-4 text-light text-center">
            Увы... Загруженных глав пока нет.
        </div>
    );
};

ChaptersList.propTypes = {
    id: PropTypes.string
};

export default ChaptersList;
