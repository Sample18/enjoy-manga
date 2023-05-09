import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ReadMangaItem from "../common/readMangaItem";
import HeadingWrapper from "../common/headingWrapper";

const UserReadList = ({ readingContent }) => {
    return (
        <div className="w-50 mx-1 text-light">
            <HeadingWrapper size={2} center={true}>
                Читаю
            </HeadingWrapper>
            {readingContent.length > 0 ? (
                <List
                    sx={{
                        bgcolor: "dark",
                        border: "1px solid #0f0f0f",
                        borderRadius: ".25rem",
                        maxHeight: "340px",
                        overflow: "auto"
                    }}
                >
                    {readingContent.map((content, index) => (
                        <ReadMangaItem content={content} key={index} />
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
                        <ListItemText primary="Пользователь не прочитал ни одной главы. Пока..." />
                    </ListItemButton>
                </ListItem>
            )}
        </div>
    );
};

UserReadList.propTypes = {
    readingContent: PropTypes.array
};

export default UserReadList;
