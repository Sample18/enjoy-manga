import { useState } from "react";
import httpService from "../services/http.service";
import product from "../mockData/product.json";
import genres from "../mockData/genres.json";
import comments from "../mockData/comments.json";
import chapters from "../mockData/chapters.json";

const useMockData = () => {
    const [error, setError] = useState(null);

    async function initialize() {
        try {
            for (const prod of product) {
                await httpService.put("product/" + prod.id + ".json", prod);
            }
            for (const gen of genres) {
                await httpService.put("genres/" + gen.id + ".json", gen);
            }
            for (const comment of comments) {
                await httpService.put(
                    "comments/" + comment.id + ".json",
                    comment
                );
            }
            for (const chapter of chapters) {
                await httpService.put(
                    "chapters/" + chapter.id + ".json",
                    chapter
                );
            }
        } catch (error) {
            setError(error);
        }
    }

    return { error, initialize };
};

export default useMockData;
