import React, { useEffect, useState } from "react";
import { useProduct } from "../../../hooks/useProduct";
import { useChapters } from "../../../hooks/useChapters";
import { nanoid } from "nanoid";
import FileField from "../../common/form/fileField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import _ from "lodash";
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

const firebaseConfig = {
    storageBucket: "gs://enjoy-manga.appspot.com"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const metadata = {
    contentType: "image/jpeg"
};

const DownloadChapterForm = () => {
    const [data, setData] = useState({
        name: "",
        number: "",
        mangaName: "",
        images: ""
    });
    const initialChapter = {
        id: "",
        mangaId: "",
        number: "",
        name: "",
        date: "",
        content: []
    };
    const [chapter, setChapter] = useState(initialChapter);
    const { manga } = useProduct();
    const { uploadChapter } = useChapters();
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const mangaList = manga.map((m) => ({
        label: m.nameRu,
        value: m.id
    }));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        const summaryCount = data.images.length;
        const newProgress = Math.floor((count / summaryCount) * 100);

        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            const content = _.sortBy(chapter.content, (url) => {
                const pageNumber = url.match(/pageNumber(\d+)/);
                return pageNumber ? parseInt(pageNumber[1]) : 0;
            });
            const newChapter = {
                ...chapter,
                content
            };
            uploadChapter(newChapter);
            console.log(newChapter);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    function uploadData(data, file, i) {
        const imagesRef = ref(
            storage,
            `${data.mangaName}/ch${data.number}/${`pageNumber` + (i + 1)}`
        );
        const uploadData = uploadBytesResumable(imagesRef, file, metadata);
        uploadData.on(
            "state_changed",
            (snapshot) => {
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadData.snapshot.ref).then((url) => {
                    setChapter((prevState) => ({
                        ...prevState,
                        content: [...prevState.content, url]
                    }));
                    incrementCount();
                });
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setChapter(initialChapter);
        setChapter((prevState) => ({
            ...prevState,
            id: nanoid(),
            mangaId: data.mangaName,
            number: data.number,
            name: data.name,
            date: Date.now()
        }));
        data.images.forEach((file, i) => uploadData(data, file, i));
    };

    return (
        <form onSubmit={handleSubmit} className="w-25 m-auto">
            <SelectField
                label="Выберите мангу"
                defaultOption="Chooose..."
                name="mangaName"
                options={mangaList}
                value={data.mangaName}
                onChange={handleChange}
                // error={}
            />
            <TextField
                label="Задайте название главы"
                name="name"
                value={data.name}
                onChange={handleChange}
                // error={}
            />
            <TextField
                label="Задайте номер главы"
                name="number"
                type="number"
                value={data.number}
                onChange={handleChange}
                // error={}
            />
            <FileField
                label="Загрузите изображения"
                name="images"
                value={data.images}
                onChange={handleChange}
                // error={}
            />
            <button
                type="submit"
                // disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default DownloadChapterForm;
