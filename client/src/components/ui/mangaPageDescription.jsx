import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import SpanWrapper from "../common/spanWrapper";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { getGenresList } from "../../store/genres";
import UpdateTextInput from "./hoc/updateTextInput";
import { updateManga } from "../../store/product";

const MangaPageDescription = ({ manga, isAdmin }) => {
    const [data, setData] = useState(manga);
    const areaRef = useRef(null);

    const dispatch = useDispatch();
    const genres = useSelector(getGenresList());

    const genresList = genres
        ? genres.map((g) => ({
              label: g.nameRu,
              value: g._id
          }))
        : [];

    const getGenreById = (id) => genres.find((g) => g._id === id);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleRadioChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        dispatch(updateManga({ ...data, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof data.genres[0] !== "string") {
            return dispatch(
                updateManga({
                    ...data,
                    genres: data.genres.map((g) => g.value)
                })
            );
        }
        return dispatch(updateManga(data));
    };

    const getStylesForTextArea = (ref) => {
        const width = window.getComputedStyle(ref).width;
        const height = window.getComputedStyle(ref).height;
        return { width, height, backgroundColor: "transparent" };
    };

    return (
        <div>
            {manga ? (
                <div className="mb-4">
                    <h1
                        className={
                            isAdmin
                                ? "headers-pageDescriptionAdmin"
                                : "headers-pageDescription"
                        }
                    >
                        <UpdateTextInput
                            type="text"
                            isAdmin={isAdmin}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={data.name}
                            name={"name"}
                        >
                            <SpanWrapper>{manga.name}</SpanWrapper>
                        </UpdateTextInput>
                        &nbsp;/&nbsp;
                        <UpdateTextInput
                            type="text"
                            isAdmin={isAdmin}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={data.nameRu}
                            name={"nameRu"}
                        >
                            <span>{manga.nameRu}</span>
                        </UpdateTextInput>
                    </h1>
                    <h4
                        className={
                            isAdmin
                                ? "headers-pageDescriptionAdmin"
                                : "headers-pageDescription"
                        }
                    >
                        Автор:&nbsp;
                        <UpdateTextInput
                            type="text"
                            isAdmin={isAdmin}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={data.author}
                            name={"author"}
                        >
                            <SpanWrapper>{manga.author}</SpanWrapper>
                        </UpdateTextInput>
                    </h4>
                    <h4
                        className={
                            isAdmin
                                ? "headers-pageDescriptionAdmin"
                                : "headers-pageDescription"
                        }
                    >
                        Категория:&nbsp;
                        <UpdateTextInput
                            type="radio"
                            isAdmin={isAdmin}
                            onChange={handleRadioChange}
                            onSubmit={handleSubmit}
                            value={data.category}
                            name={"category"}
                            options={[
                                { name: "Манга", value: "Манга" },
                                { name: "Манхва", value: "Манхва" }
                            ]}
                        >
                            <SpanWrapper>{manga.category}</SpanWrapper>
                        </UpdateTextInput>
                    </h4>
                    <h4
                        className={
                            isAdmin
                                ? "headers-pageDescriptionAdmin"
                                : "headers-pageDescription"
                        }
                    >
                        Жанры:&nbsp;
                        {genres ? (
                            <UpdateTextInput
                                type="multySelect"
                                isAdmin={isAdmin}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                name={"genres"}
                                options={genresList}
                                defaultValue={manga.genres.map((id, i) => ({
                                    label: getGenreById(id).nameRu,
                                    value: id
                                }))}
                            >
                                {manga.genres.map((id, i) => (
                                    <SpanWrapper key={id}>
                                        {getGenreById(id).nameRu}
                                        {i === manga.genres.length - 1
                                            ? ""
                                            : ","}
                                        &nbsp;
                                    </SpanWrapper>
                                ))}
                            </UpdateTextInput>
                        ) : (
                            ""
                        )}
                    </h4>
                    <h4
                        className={
                            isAdmin
                                ? "headers-pageDescriptionAdmin flex-column"
                                : "headers-pageDescription flex-column"
                        }
                    >
                        Описание:
                        <UpdateTextInput
                            type="textArea"
                            isAdmin={isAdmin}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={data.description}
                            name={"description"}
                            style={
                                areaRef.current &&
                                getStylesForTextArea(areaRef.current)
                            }
                        >
                            <p className="gray-color" ref={areaRef}>
                                {manga.description}
                            </p>
                        </UpdateTextInput>
                    </h4>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

MangaPageDescription.propTypes = {
    manga: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    isAdmin: PropTypes.bool
};

export default MangaPageDescription;
