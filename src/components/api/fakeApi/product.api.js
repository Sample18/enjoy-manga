import { genres } from "./genres.api";

const product = [
    {
        id: "41d26909-3b21-45ff-968b-d3009df3b6cb",
        name: "Berserk",
        nameRu: "Берсерк",
        cover: "manga/berserk/ch1/image000.jpg",
        author: "Кентаро Миура",
        category: "Манга",
        description:
            "Гатс, известный как Чёрный Мечник, ищет убежища от демонов, охотящихся за ним, и отмщения человеку, сделавшему из него жертву на своём алтаре. С помощью только своей титанической силы, умения и меча, Гатс должен биться против жестокого рока, пока битва с ненавистью мало-помалу лишает его человечности. Берсерк — это тёмная и погружающая в раздумья история о неистовых сражениях и безжалостном роке.",
        date: "1675261327993",
        genres: [genres.fantasy, genres.adventure, genres.seinen],
        rate: 10,
        favourite: false
    },
    {
        id: "572adfd1-7b23-4c18-9a36-b20f0a52b19a",
        name: "Jujutsu Kaisen",
        nameRu: "Магическая битва",
        cover: "manga/jujutsu_kaisen/ch1/001.jpg",
        author: "Акутами Гэгэ",
        category: "Манга",
        description:
            "Талантливого Юдзи школьная жизнь мало привлекает. Но всё изменилось, когда он становится частью клуба оккультных исследований и находит один из пальцев великого Проклятого духа по имени «Сукуна».",
        date: "1675261349257",
        genres: [genres.fantasy, genres.adventure, genres.seinen],
        rate: 10,
        favourite: false
    }
];

if (!localStorage.getItem("manga")) {
    localStorage.setItem("manga", JSON.stringify(product));
}

const findByName = (name) =>
    JSON.parse(localStorage.getItem("manga")).find(
        (m) => m.name.toLowerCase().replace(/ /g, "") === name.toLowerCase()
    );

const findById = (id) =>
    JSON.parse(localStorage.getItem("manga")).find((m) => m.id === id);

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("manga")));
        }, 500);
    });

const getByName = (name) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(findByName(name));
        }, 500);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(findById(id));
        }, 500);
    });

export default { fetchAll, getByName, getById };
