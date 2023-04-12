const comments = [
    {
        _id: "67rdca3eebdf6fg",
        userId: "67rdca3eeb7f6fgeed471815",
        pageId: "41d26909-3b21-45ff-968b-d3009df3b6cb",
        content: "Lorem ipsum dolor",
        created_at: "1676650803112"
    },
    {
        _id: "67rdcajhf6fg",
        userId: "67rdca3eeb7f6fgeed471815",
        pageId: "41d26909-3b21-45ff-968b-d3009df3b6cb",
        content: "Lorem ipsum 123",
        created_at: "1676650837534"
    },
    {
        _id: "67rdcasd7f6fg",
        userId: "67rdca3eeb7f6fgeed471815",
        pageId: "41d26909-3b21-45ff-968b-d3009df3b6cb",
        content: "Lorem ipsum4554",
        created_at: "1676650823255"
    },
    {
        _id: "67rdcakj7f6fg",
        userId: "67rdca3eeb7f6fgeed471815",
        pageId: "41d26909-3b21-45ff-968b-d3009df3b6cb",
        content: "Lorem ipsum dfjgdhkdgk",
        created_at: "1633576399367"
    },
    {
        _id: "67rdvbcb7f6fgdasd",
        pageId: "41d26909-3b21-45ff-968b-d3009df3b6cb",
        userId: "67rdca3eeb7f6fgeed471815",
        content: "Lorem ipsum dolor and etc",
        created_at: "1633573058520"
    },
    {
        _id: "67rdca3vx6fgdaasd",
        pageId: "572adfd1-7b23-4c18-9a36-b20f0a52b19a",
        userId: "67rdca3eeb7f6fgeed471815",
        content: "Lorem ipsum dolor and etc",
        created_at: "1633573058520"
    }
];
if (!localStorage.getItem("emComments")) {
    localStorage.setItem("emComments", JSON.stringify(comments));
}
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(comments);
        }, 200);
    });

const fetchCommentsForPage = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("emComments")).filter(
                    (c) => c.pageId === id
                )
            );
        }, 200);
    });
const add = (data) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const comments = JSON.parse(localStorage.getItem("emComments"));
            const newComment = {
                ...data,
                created_at: Date.now(),
                _id: Math.random().toString(36).substr(2, 9)
            };
            comments.push(newComment);
            localStorage.setItem("emComments", JSON.stringify(comments));
            resolve(newComment);
        }, 200);
    });

const remove = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const comments = JSON.parse(localStorage.getItem("emComments"));
            const newComments = comments.filter((x) => x._id !== id);
            console.log(id);
            console.log(newComments);
            localStorage.setItem("emComments", JSON.stringify(newComments));
            resolve(id);
        }, 200);
    });

export default {
    fetchAll,
    fetchCommentsForPage,
    add,
    remove
};
