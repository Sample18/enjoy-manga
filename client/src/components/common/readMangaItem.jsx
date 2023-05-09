import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { getMangaById } from "../../store/product";
import { useHistory } from "react-router-dom";

const ReadMangaItem = ({ content }) => {
    const manga = useSelector(getMangaById(content.mangaId));
    const history = useHistory();
    const handleClick = () =>
        history.push(`/reader/${content.mangaId}/${content.lastChapter}/1`);

    return (
        manga && (
            <ListItem>
                <ListItemButton
                    sx={{
                        border: "1px solid #0f0f0f",
                        borderRadius: ".25rem"
                    }}
                    onClick={handleClick}
                >
                    <ListItemText
                        primary={`${manga.name} / ${manga.nameRu} - ${content.lastChapter} глава`}
                    />
                </ListItemButton>
            </ListItem>
        )
    );
};

ReadMangaItem.propTypes = {
    content: PropTypes.object
};

export default ReadMangaItem;
