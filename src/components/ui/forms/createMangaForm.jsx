import React, { useState } from "react";
import { nanoid } from "nanoid";
import FileField from "../../common/form/fileField";
import TextField from "../../common/form/textField";
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { validator } from "../../../utils/validator";
import MultySelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import TextAreaField from "../../common/form/textAreaField";
import { generateRandomNumber } from "../../../utils/random";
import { useDispatch, useSelector } from "react-redux";
import { uploadManga } from "../../../store/product";
import { toast } from "react-toastify";
import { getGenresList } from "../../../store/genres";
import { getCurrentUserData } from "../../../store/users";

const firebaseConfig = {
    storageBucket: "gs://enjoy-manga.appspot.com"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const CreateMangaForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const initialState = {
        name: "",
        nameRu: "",
        author: "",
        category: "манга",
        description: "",
        genres: [],
        cover: "",
        moderateStatus: "onCheck"
    };
    const [data, setData] = useState(initialState);
    const genres = useSelector(getGenresList());
    const [errors, setErrors] = useState({});
    const genresList = genres
        ? genres.map((g) => ({
              label: g.nameRu,
              value: g.id
          }))
        : [];
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            },
            min: {
                message: "Название должно состоять минимум из 3 символов",
                value: 3
            }
        },
        nameRu: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            },
            min: {
                message: "Название должно состоять минимум из 3 символов",
                value: 3
            }
        },
        author: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        description: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            },
            min: {
                message: "Описание должно состоять минимум из 3 символов",
                value: 3
            }
        },
        cover: {
            isImages: {
                message: "Файлы не являются изображениями или отсутствуют"
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    function uploadData(data) {
        const imagesRef = ref(
            storage,
            `covers/${data.name}/${data.name}_cover`
        );
        const uploadData = uploadBytesResumable(imagesRef, data.cover[0]);
        uploadData.on(
            "state_changed",
            () => {},
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadData.snapshot.ref).then((url) => {
                    const product = {
                        id: nanoid(),
                        date: Date.now(),
                        rate: generateRandomNumber(1, 10),
                        ...data,
                        genres: data.genres.map((g) => g.value),
                        cover: url,
                        uploadBy: currentUser.id
                    };
                    dispatch(uploadManga(product));
                    toast.success("Манга загружена!");
                });
            }
        );
    }

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        uploadData(data, data.cover[0]);
        setData(initialState);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-50 m-auto mb-4">
                <TextField
                    label="Задайте название произведения по английски"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Задайте название произведения по русски"
                    name="nameRu"
                    value={data.nameRu}
                    onChange={handleChange}
                    error={errors.nameRu}
                />
                <TextField
                    label="Укажите автора"
                    name="author"
                    value={data.author}
                    onChange={handleChange}
                    error={errors.author}
                />
                <MultySelectField
                    label="Выберите жанры"
                    name="genres"
                    onChange={handleChange}
                    options={genresList}
                />
                <RadioField
                    label="Выберите категорию"
                    name="category"
                    onChange={handleChange}
                    value={data.category}
                    options={[
                        { name: "Манга", value: "манга" },
                        { name: "Манхва", value: "манхва" }
                    ]}
                />
                <TextAreaField
                    label="Напишите описание произведения"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    error={errors.description}
                />
                <FileField
                    label="Загрузите обложку в формате jpeg или png"
                    name="cover"
                    value={data.cover}
                    onChange={handleChange}
                    error={errors.cover}
                    isMultiple={false}
                />
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-secondary w-100 mx-auto mb-4"
                >
                    Создать мангу
                </button>
            </form>
        </>
    );
};

export default CreateMangaForm;
