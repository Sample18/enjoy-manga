import React from "react";
import { useParams } from "react-router-dom";
import { useGenres } from "../../../hooks/useGenres";
import { useProduct } from "../../../hooks/useProduct";
import { firstSymbToUpperCase } from "../../../utils/textTransform";
import ContentContainer from "../../common/contentContainer";
import SpanWrapper from "../../common/spanWrapper";
import Loader from "../../ui/loader/loader";
import MangaCard from "../../ui/mangaCard/mangaCard";
import SortBar from "../../ui/sortBar/sortBar";

const GenrePage = () => {
    const { genreName } = useParams();
    const { getGenreByName } = useGenres();
    const { manga } = useProduct();
    const genre = getGenreByName(genreName);
    const mangaCrop = filterManga();

    function filterManga() {
        const mangaArray = [];
        if (genre && manga.length !== 0) {
            for (const m of manga) {
                const finded = m.genres.find((g) => g === genre.id);
                if (finded) {
                    mangaArray.push(m);
                }
            }
        }
        return mangaArray;
    }

    return (
        <ContentContainer>
            {genre ? (
                <>
                    <div className="border border-light w-75 m-auto mb-5">
                        <h1 className="text-light">
                            {firstSymbToUpperCase(genre.nameRu)}
                        </h1>
                        <SpanWrapper>{genre.description}</SpanWrapper>
                    </div>
                    <SortBar
                        heading={`Манга в жанре - ${genre.nameRu}`}
                        formVisible={false}
                    />
                    <div className="d-flex flex-wrap">
                        {mangaCrop.length !== 0 ? (
                            mangaCrop.map((m) => (
                                <MangaCard manga={m} key={m.id} />
                            ))
                        ) : (
                            <h1 className="text-light">
                                В данный момент на сайте нет манги в таком жанре
                            </h1>
                        )}
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </ContentContainer>
    );
};

export default GenrePage;
