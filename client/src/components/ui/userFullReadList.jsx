import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ReadMangaItem from "../common/readMangaItem";
import HeadingWrapper from "../common/headingWrapper";

const UserFullReadList = ({ readingContent }) => {
    const alredyRead = readingContent
        ? readingContent.filter((content) => content.alredyRead)
        : [];

    return (
        <div className="w-50 mx-1 text-light">
            <HeadingWrapper size={2} center={true}>
                Прочитанно
            </HeadingWrapper>
            {alredyRead.length > 0 ? (
                <List
                    sx={{
                        bgcolor: "dark",
                        border: "1px solid #0f0f0f",
                        borderRadius: ".25rem",
                        maxHeight: "340px",
                        overflow: "auto"
                    }}
                >
                    {alredyRead.map((content, index) => (
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
                        <ListItemText primary="Ни одно произведение не прочитано полностью." />
                    </ListItemButton>
                </ListItem>
            )}
        </div>
    );
};

UserFullReadList.propTypes = {
    readingContent: PropTypes.array
};

export default UserFullReadList;
