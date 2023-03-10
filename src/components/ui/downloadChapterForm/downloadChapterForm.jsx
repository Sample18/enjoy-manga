import React, { useState } from "react";
import { useProduct } from "../../../hooks/useProduct";
import FileField from "../../common/form/fileField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    storageBucket: "gs://enjoy-manga.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
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
    const { manga } = useProduct();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data.images[0]);
        data.images.forEach((file) => {
            const imagesRef = ref(
                storage,
                `${data.mangaName}/ch${data.number}/${file.name}`
            );
            uploadBytes(imagesRef, file, metadata).then((snapshot) => {
                console.log(snapshot);
            });
        });
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
