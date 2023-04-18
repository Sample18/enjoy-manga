import httpService from "./http.service";

const chaptersEndpoint = "chapter";

const chaptersService = {
    get: async () => {
        const { data } = await httpService.get(chaptersEndpoint);
        return data;
    },
    upload: async (payload) => {
        const { data } = await httpService.post(chaptersEndpoint, payload);
        return data;
    }
};

export default chaptersService;
