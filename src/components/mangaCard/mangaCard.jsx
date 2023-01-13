import React from "react";
import { Link } from "react-router-dom";
import styles from "./mangaCard.module.css";
import PropTypes from "prop-types";

const MangaCard = ({ manga, deleteManga, toFavourite }) => {
  const { card, cover, coverImg, caption, del_m, fav, nfav } = styles;
  return (
    <div className={card}>
      <Link to={`/c`} className={cover}>
        <img
          className={coverImg}
          src={manga.cover}
          alt="test"
          width="250"
          height="353"
        />
        <div className={caption}>
          {manga.name} / {manga.nameRu}
        </div>
      </Link>
      <div className={del_m} onClick={() => deleteManga(manga.id)}>
        X
      </div>
      <div
        className={manga.favourite ? fav : nfav}
        onClick={() => toFavourite(manga.id)}
      >
        F
      </div>
    </div>
  );
};

MangaCard.propTypes = {
  manga: PropTypes.object.isRequired,
  deleteManga: PropTypes.func,
  toFavourite: PropTypes.func,
};

export default MangaCard;
