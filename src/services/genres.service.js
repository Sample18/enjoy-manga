import httpService from "./http.service";

const genresEndpoint = "genres/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(genresEndpoint);
        return data;
    }
};

export default genresService;
