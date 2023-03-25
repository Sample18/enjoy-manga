import httpService from "./http.service";

const commentsEndpoint = "comments/";

const commentsService = {
    get: async () => {
        const { data } = await httpService.get(commentsEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            commentsEndpoint + payload.id,
            payload
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentsEndpoint, {
            params: {
                orderBy: `"pageId"`,
                equalTo: `"${pageId}"`
            }
        });
        return data;
    }
};

export default commentsService;
