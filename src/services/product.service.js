import httpService from "./http.service";

const productEndpoint = "product/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    upload: async (manga) => {
        const { data } = await httpService.put(
            productEndpoint + manga.id,
            manga
        );
        return data;
    }
};

export default productService;
