export const genres = {
    fantasy: {
        id: "e0b22e88-4335-4330-b18b-5a6470146464",
        name: "fantasy",
        nameRu: "фэнтези",
        description:
            "Фэ́нтези[1] (от англ. fantasy — «фантазия») — жанр фантастической литературы, основанный на использовании мифологических и сказочных мотивов."
    },
    seinen: {
        id: "1656a08c-f231-42d2-81bb-e9e938cf806d",
        name: "seinen",
        nameRu: "сёнэн",
        description:
            "Работы, придуманные и написанные в основном для читателей мужского пола. Содержат битвы и насилие."
    },
    adventure: {
        id: "80ca57f1-07cb-422a-901f-77256c6259c9",
        name: "adventure",
        nameRu: "приключения",
        description:
            "Если главный герой отправляется в путешествие или что-то похожее, то держу пари, что это приключенческая манга."
    },
    drama: {
        id: "a0bd3039-0990-4032-bc04-98d34365a368",
        name: "drama",
        nameRu: "драма",
        description:
            "Если жанр манги - драма, то обычно эта манга вызывает у читателя сильные эмоции напряжения и/или печали."
    },
    action: {
        id: "2b8b904c-bebd-4358-94b3-2338cc9a6472",
        name: "action",
        nameRu: "боевик",
        description:
            "Работа, содержащая насилие, драки, схватки и быстрыми сменами действия."
    },
    detective: {
        id: "0975ae98-4ecf-46df-bad6-de42e042a63b",
        name: "detective",
        nameRu: "детектив",
        description: "Расследования и поиски улик - детективные истории."
    },
    supernatural: {
        id: "956b81b6-0b07-4a6b-9649-454bcd9e9860",
        name: "supernatural",
        nameRu: "сверхъестественное",
        description:
            "Повествует о невероятных и необъяснимых явлениях, которые противоречат законам физики."
    },
    horror: {
        id: "fc403064-4549-4512-b6b6-a57518df7b76",
        name: "horror",
        nameRu: "ужасы",
        description:
            "Болезненные эмоции страха, ужаса, отвращения, дрожи от террора и омерзения - все эмоции, вызванные чем-либо ужасным и пугающим."
    },
    sliceOfLife: {
        id: "9bc213d1-d018-4a57-93cc-408de43965f0",
        name: "sliceOfLife",
        nameRu: "повседневность",
        description: "Работы описывают обычную жизнь обычных людей."
    },
    isekai: {
        id: "24804187-2941-44fb-ba48-bb3742970230",
        name: "isekai",
        nameRu: "исэкай",
        description:
            "Японский жанр портального фэнтези. Он включает в себя романы, легкие романы, фильмы, мангу, аниме и видеоигры, которые вращаются вокруг человека или людей, которые перенесены в другой мир и должны выжить в другом мире, таком как мир фантазий, виртуальный мир, другая планета или параллельная вселенная."
    }
};

if (!localStorage.getItem("genres")) {
    localStorage.setItem("genres", JSON.stringify(genres));
}

const findByName = (name) =>
    Object.values(JSON.parse(localStorage.getItem("genres"))).find(
        (v) =>
            v.name.toLowerCase().replace(/ /g, "") ===
            name.toLowerCase().replace(/ /g, "")
    );

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("genres")));
        }, 500);
    });

const getByName = (name) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(findByName(name));
        }, 500);
    });

export default { fetchAll, getByName };
