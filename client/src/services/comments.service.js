import httpService from "./http.service";

const commentsEndpoint = "comment";

const commentsService = {
    get: async () => {
        const { data } = await httpService.get(commentsEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(commentsEndpoint, payload);
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentsEndpoint, {
            params: {
                orderBy: "pageId",
                equalTo: `${pageId}`
            }
        });
        return data;
    },
    remove: async (id) => {
        const { data } = await httpService.delete(`${commentsEndpoint}/${id}`);
        return data;
    }
};

export default commentsService;
