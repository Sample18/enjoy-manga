import React, { useState } from "react";
import PropTypes from "prop-types";
import SpanWrapper from "../common/spanWrapper";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { getGenresList } from "../../store/genres";
import styles from "../../styles/mangaPageDescription.module.css";
import ParWrapper from "../common/pWrapper";
import { getAdminRole } from "../../store/users";
import UpdateTextInput from "./hoc/updateTextInput";
import { updateManga } from "../../store/product";

const MangaPageDescription = ({ manga }) => {
    const { textDescription } = styles;
    const [data, setData] = useState(manga);

    const dispatch = useDispatch();
    const genres = useSelector(getGenresList());
    const isAdmin = useSelector(getAdminRole());

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
        console.log(data);
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

    return (
        <div>
            {manga ? (
                <div className="mb-4">
                    <h1 className={isAdmin ? textDescription : "text-light"}>
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
                        /{" "}
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
                    <h4 className={isAdmin ? textDescription : "text-light"}>
                        Автор:{" "}
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
                    <h4 className={isAdmin ? textDescription : "text-light"}>
                        Категория:{" "}
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
                    <h4 className={isAdmin ? textDescription : "text-light"}>
                        Жанры:{" "}
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
                                            : ","}{" "}
                                    </SpanWrapper>
                                ))}
                            </UpdateTextInput>
                        ) : (
                            ""
                        )}
                    </h4>
                    <h4 className={isAdmin ? textDescription : "text-light"}>
                        Описание:
                        <UpdateTextInput
                            type="textArea"
                            isAdmin={isAdmin}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={data.description}
                            name={"description"}
                        >
                            <ParWrapper>{manga.description}</ParWrapper>
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
    manga: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default MangaPageDescription;
