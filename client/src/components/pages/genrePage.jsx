import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGenreByName } from "../../store/genres";
import { getMangaList } from "../../store/product";
import { firstSymbToUpperCase } from "../../utils/textTransform";
import BackButton from "../common/backButton";
import ContentContainer from "../common/contentContainer";
import SpanWrapper from "../common/spanWrapper";
import Loader from "../ui/loader";
import MangaCard from "../ui/mangaCard";
import SortBar from "../ui/sortBar";

const GenrePage = () => {
    const { genreName } = useParams();
    const genre = useSelector(getGenreByName(genreName));
    const manga = useSelector(getMangaList());
    const mangaCrop = filterManga();

    function filterManga() {
        const mangaArray = [];
        if (genre && manga) {
            for (const m of manga) {
                const finded = m.genres.find((g) => g === genre._id);
                if (finded) {
                    mangaArray.push(m);
                }
            }
        }
        return mangaArray;
    }

    return (
        <ContentContainer>
            <BackButton />
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
                                <MangaCard manga={m} key={m._id} />
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
