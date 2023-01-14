import { genres } from "./genres.api";

const product = [
    {
        id: "41d26909-3b21-45ff-968b-d3009df3b6cb",
        name: "Berserk",
        nameRu: "Берсерк",
        cover: "manga/berserk/ch1/image000.jpg",
        author: "Кентаро Миура",
        category: "Манга",
        date: "2011 9 31",
        genres: [genres.fantasy, genres.adventure, genres.seinen],
        rate: 10,
        favourite: false,
        chapters: [
            {
                id: "7bd4cccd-6a95-4e3e-a637-acda26d37013",
                mangaName: "Berserk",
                author: "Кентаро Миура",
                category: "Манга",
                genres: [genres.fantasy, genres.adventure, genres.seinen],
                number: "1",
                name: "Том 1. Глава 0",
                date: "22 01 2022, 15:17",
                content: [
                    "manga/berserk/ch1/image010.jpg",
                    "manga/berserk/ch1/image011.jpg",
                    "manga/berserk/ch1/image012.jpg"
                ]
            },
            {
                id: "fc9ed7b8-39f2-4710-b9e5-c518c9b47b74",
                mangaName: "Berserk",
                author: "Кентаро Миура",
                category: "Манга",
                genres: [genres.fantasy, genres.adventure, genres.seinen],
                number: "2",
                name: "Том 1. Глава 1",
                date: "29 01 2022, 14:17",
                content: [
                    "manga/berserk/ch1/image013.jpg",
                    "manga/berserk/ch1/image014.jpg",
                    "manga/berserk/ch1/image015.jpg"
                ]
            },
            {
                id: "0dd9745f-e15a-4a24-9309-100e538cafca",
                mangaName: "Berserk",
                author: "Кентаро Миура",
                category: "Манга",
                genres: [genres.fantasy, genres.adventure, genres.seinen],
                number: "3",
                name: "Том 1. Глава 2",
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
        id: "572adfd1-7b23-4c18-9a36-b20f0a52b19a",
        name: "Jujutsu Kaisen",
        nameRu: "Магическая битва",
        cover: "manga/jujutsu_kaisen/ch1/001.jpg",
        author: "Акутами Гэгэ",
        category: "Манга",
        genres: [genres.fantasy, genres.adventure, genres.seinen],
        rate: 10,
        favourite: false,
        chapters: [
            {
                id: "e95d63a5-688a-44d9-8428-aa7de021acd1",
                mangaName: "Jujutsu Kaisen",
                author: "Акутами Гэгэ",
                category: "Манга",
                genres: [genres.fantasy, genres.adventure, genres.seinen],
                number: "1",
                name: "Том 1 Глава 1: Двуликий Призрак",
                date: "29 01 2022, 14:00",
                content: [
                    "manga/jujutsu_kaisen/ch1/002.jpg",
                    "manga/jujutsu_kaisen/ch1/003.png",
                    "manga/jujutsu_kaisen/ch1/004.png"
                ]
            },
            {
                id: "a8196dff-b176-4099-8ab6-f57e84cdae30",
                mangaName: "Jujutsu Kaisen",
                author: "Акутами Гэгэ",
                category: "Манга",
                genres: [genres.fantasy, genres.adventure, genres.seinen],
                number: "2",
                name: "Том 1 Глава 2: Тайная казнь",
                date: "29 01 2022, 15:00",
                content: [
                    "manga/jujutsu_kaisen/ch1/005.png",
                    "manga/jujutsu_kaisen/ch1/006.png",
                    "manga/jujutsu_kaisen/ch1/007.png"
                ]
            },
            {
                id: "43ec9524-2726-4f3c-ab41-142bb64ac020",
                mangaName: "Jujutsu Kaisen",
                author: "Акутами Гэгэ",
                category: "Манга",
                genres: [genres.fantasy, genres.adventure, genres.seinen],
                number: "3",
                name: "Том 1 Глава 3: Ради меня",
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
