import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import FavMangaItem from "../common/favMangaItem";

const UserFavoritesList = ({ favs }) => {
    return (
        <div className="w-50 mx-1">
            <h2 className="text-center">Избранное</h2>

            {favs.length ? (
                <List
                    sx={{
                        bgcolor: "dark",
                        border: "1px solid #0f0f0f",
                        borderRadius: ".25rem",
                        maxHeight: "340px",
                        overflow: "auto"
                    }}
                >
                    {favs.map((id, index) => (
                        <FavMangaItem id={id} key={index} />
                    ))}
                </List>
            ) : (
                <ListItem>
                    <ListItemButton
                        sx={{
                            border: "1px solid #0f0f0f",
                            borderRadius: ".25rem"
                        }}
                    >
                        <ListItemText primary="Тут пока ничего нет..." />
                    </ListItemButton>
                </ListItem>
            )}
        </div>
    );
};

UserFavoritesList.propTypes = {
    favs: PropTypes.array
};

export default UserFavoritesList;
