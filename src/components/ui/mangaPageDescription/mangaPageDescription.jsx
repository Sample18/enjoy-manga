import React from "react";
import PropTypes from "prop-types";
import SpanWrapper from "../../common/spanWrapper";
import Loader from "../loader/loader";

const MangaPageDescription = ({ manga, genres }) => {
    return (
        <div>
            {manga.length !== 0 ? (
                <>
                    <h1 className="text-white">
                        <SpanWrapper>{manga.name}</SpanWrapper> /{" "}
                        <span>{manga.nameRu}</span>
                    </h1>
                    <h4 className="text-white">
                        Автор: <SpanWrapper>{manga.author}</SpanWrapper>
                    </h4>
                    <h4 className="text-white">
                        Категория: <SpanWrapper>{manga.category}</SpanWrapper>
                    </h4>
                    <h4 className="text-white">
                        Жанры:{" "}
                        {genres &&
                            genres.map((tag, i) => (
                                <SpanWrapper key={tag.id}>
                                    {tag.name}
                                    {i === genres.length - 1 ? "" : ","}{" "}
                                </SpanWrapper>
                            ))}
                    </h4>
                    <h4 className="text-white">Описание: </h4>
                    <SpanWrapper>{manga.description}</SpanWrapper>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

MangaPageDescription.propTypes = {
    manga: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    genres: PropTypes.array
};

export default MangaPageDescription;
