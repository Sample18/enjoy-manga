import httpService from "./http.service";

const chaptersEndpoint = "chapters/";

const chaptersService = {
    get: async () => {
        const { data } = await httpService.get(chaptersEndpoint);
        return data;
    }
};

export default chaptersService;
