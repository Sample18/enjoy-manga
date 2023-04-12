import httpService from "./http.service";

const chaptersEndpoint = "chapters/";

const chaptersService = {
    get: async () => {
        const { data } = await httpService.get(chaptersEndpoint);
        return data;
    },
    upload: async (chapter) => {
        const { data } = await httpService.put(
            chaptersEndpoint + chapter.id,
            chapter
        );
        return data;
    }
};

export default chaptersService;
