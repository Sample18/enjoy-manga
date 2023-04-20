import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MangaCard = ({ manga }) => {
    return (
        <div className="manga-card">
            <Link
                to={`/catalog/${manga.name.toLowerCase().replace(/ /g, "")}`}
                className="card-cover"
            >
                <img
                    className="coverImg"
                    src={manga.cover}
                    alt={manga.name + " cover"}
                    width="250"
                    height="353"
                />
                <div className="caption">
                    {manga.name} / {manga.nameRu}
                </div>
            </Link>
        </div>
    );
};

MangaCard.propTypes = {
    manga: PropTypes.object.isRequired
};

export default MangaCard;
