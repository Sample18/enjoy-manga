import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SpanWrapper from "../../common/spanWrapper";
import BadgeWrapper from "../../common/badgeWrapper/badgeWrapper";

const ChapterCardDescription = ({ chapter }) => {
    return (
        <div className="container p-0 text-white">
            <h1 className="border-bottom border-dark m-2">
                <Link
                    to={`/reader/${chapter.mangaId}/${chapter.number}/1`}
                    className="page-link"
                >
                    {chapter.name}
                </Link>
            </h1>
            <h4 className="border-bottom border-dark m-2">
                Автор: <SpanWrapper>{chapter.author}</SpanWrapper>
            </h4>
            <h4 className="border-bottom border-dark m-2">
                Серия: <SpanWrapper>{chapter.mangaName}</SpanWrapper>
            </h4>
            <h4 className="border-bottom border-dark m-2">
                Категории: <SpanWrapper>{chapter.category}</SpanWrapper>
            </h4>
            <h4 className="border-bottom border-dark m-2">
                Теги:
                {chapter.genres.map((tag) => (
                    <BadgeWrapper key={tag.id}>{tag.nameRu}</BadgeWrapper>
                ))}
            </h4>
        </div>
    );
};

ChapterCardDescription.propTypes = {
    chapter: PropTypes.object
};

export default ChapterCardDescription;
