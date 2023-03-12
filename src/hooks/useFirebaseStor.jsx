import { useState } from "react";
import axios from "axios";

const httpStorage = axios.create({
    baseURL: "gs://enjoy-manga.appspot.com"
});

const useFirebaseStorage = () => {
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadFileWithAxios = async (file) => {
        const response = await httpStorage.post(file, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(progress);
            }
        });

        return response.data;
    };

    return { uploadFileWithAxios, uploadProgress };
};

export default useFirebaseStorage;
