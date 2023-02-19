import React from "react";
import PropTypes from "prop-types";
import SpanWrapper from "../../common/spanWrapper";
import Loader from "../loader/loader";
import { useGenres } from "../../../hooks/useGenres";

const MangaPageDescription = ({ manga }) => {
    const { genres } = useGenres();

    const getGenreById = (id) => genres.find((g) => g.id === id);

    return (
        <div>
            {manga ? (
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
                        {genres.length !== 0
                            ? manga.genres.map((id, i) => (
                                  <SpanWrapper key={id}>
                                      {getGenreById(id).nameRu}
                                      {i === manga.genres.length - 1
                                          ? ""
                                          : ","}{" "}
                                  </SpanWrapper>
                              ))
                            : ""}
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
    manga: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default MangaPageDescription;
