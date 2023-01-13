import React, { useEffect, useState } from "react";
import API from "../api";
import MangaCard from "../mangaCard/mangaCard";
import styles from "./catalog.module.css";

const Catalog = () => {
  const { catalogContainer } = styles;
  const [mangas, setMangas] = useState();
  useEffect(() => {
    API.product.fetchAll().then((data) => setMangas(data));
  }, []);

  const handleDelete = (id) => {
    const filtred = mangas.filter((m) => m.id !== id);
    setMangas(filtred);
  };

  const handleFavourite = (id) => {
    const mIndex = mangas.findIndex((m) => m.id === id);
    const favManga = JSON.parse(JSON.stringify(mangas));
    favManga[mIndex].favourite = !favManga[mIndex].favourite;
    setMangas(favManga);
  };

  return (
    <main className={catalogContainer}>
      {mangas &&
        mangas.map((manga) => (
          <MangaCard
            manga={manga}
            key={manga.id}
            deleteManga={handleDelete}
            toFavourite={handleFavourite}
          />
        ))}
    </main>
  );
};

export default Catalog;
