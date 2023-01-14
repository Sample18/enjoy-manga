import { genres } from "./genres.api";

const product = [
    {
        id: "1",
        name: "Berserk",
        nameRu: "Берсерк",
        cover: "manga/berserk/ch1/image000.jpg",
        author: "Кентаро Миура",
        category: "Манга",
        date: "2011 9 31",
        genres: [
            genres.fantasy.name,
            genres.adventure.name,
            genres.seinen.name
        ],
        rate: 10,
        favourite: false,
        chapters: [
            {
                id: "1",
                number: "1",
                name: "Какая то глава",
                date: "22 01 2022, 15:17",
                content: [
                    "manga/berserk/ch1/image010.jpg",
                    "manga/berserk/ch1/image011.jpg",
                    "manga/berserk/ch1/image012.jpg"
                ]
            },
            {
                id: "2",
                number: "2",
                name: "Какая то глава 2",
                date: "29 01 2022, 14:17",
                content: [
                    "manga/berserk/ch1/image013.jpg",
                    "manga/berserk/ch1/image014.jpg",
                    "manga/berserk/ch1/image015.jpg"
                ]
            },
            {
                id: "3",
                number: "3",
                name: "Какая то глава 3",
                date: "29 01 2022, 15:00",
                content: [
                    "manga/berserk/ch1/image016.jpg",
                    "manga/berserk/ch1/image017.jpg",
                    "manga/berserk/ch1/image018.jpg"
                ]
            }
        ]
    },
    {
        id: "2",
        name: "Jujutsu Kaisen",
        nameRu: "Магическая битва",
        cover: "manga/jujutsu_kaisen/ch1/001.jpg",
        author: "Кентаро Миура",
        category: "Манга",
        genres: [
            genres.fantasy.name,
            genres.adventure.name,
            genres.seinen.name
        ],
        rate: 10,
        favourite: false,
        chapters: [
            {
                id: "1",
                number: "1",
                name: "Какая то глава битвы",
                date: "29 01 2022, 14:00",
                content: [
                    "manga/jujutsu_kaisen/ch1/002.jpg",
                    "manga/jujutsu_kaisen/ch1/003.png",
                    "manga/jujutsu_kaisen/ch1/004.png"
                ]
            },
            {
                id: "2",
                number: "2",
                name: "Какая то глава битвы 2",
                date: "29 01 2022, 15:00",
                content: [
                    "manga/jujutsu_kaisen/ch1/005.png",
                    "manga/jujutsu_kaisen/ch1/006.png",
                    "manga/jujutsu_kaisen/ch1/007.png"
                ]
            },
            {
                id: "3",
                number: "3",
                name: "Какая то глава битвы 3",
                date: "29 01 2022, 16:00",
                content: [
                    "manga/jujutsu_kaisen/ch1/008.png",
                    "manga/jujutsu_kaisen/ch1/009.png",
                    "manga/jujutsu_kaisen/ch1/010.png"
                ]
            }
        ]
    }
];

const chapter = () => {
    const arr = [];
    product.forEach((m) => m.chapters.forEach((c) => arr.push(c)));
    return arr;
};

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(product);
        }, 500);
    });

const getChapters = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(chapter());
        }, 500);
    });

export default { fetchAll, getChapters };
