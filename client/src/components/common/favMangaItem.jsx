import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { getMangaById } from "../../store/product";

const FavMangaItem = ({ id }) => {
    const manga = useSelector(getMangaById(id));

    return (
        manga && (
            <ListItem>
                <ListItemButton
                    sx={{
                        border: "1px solid #0f0f0f",
                        borderRadius: ".25rem"
                    }}
                >
                    <ListItemText primary={manga.name} />
                </ListItemButton>
            </ListItem>
        )
    );
};

FavMangaItem.propTypes = {
    id: PropTypes.string
};

export default FavMangaItem;
