import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const ItemsList = ({ items }) => {
    return items.length ? (
        <List
            sx={{
                bgcolor: "dark",
                border: "1px solid #0f0f0f",
                borderRadius: ".25rem"
            }}
        >
            {items.map((item, index) => (
                <ListItem key={index}>
                    <ListItemButton
                        sx={{
                            border: "1px solid #0f0f0f",
                            borderRadius: ".25rem"
                        }}
                    >
                        <ListItemText primary="Манга 1" />
                    </ListItemButton>
                </ListItem>
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
    );
};

ItemsList.propTypes = {
    items: PropTypes.array
};

export default ItemsList;
