import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { getUploadByUser } from "../../store/chapters";
import DownloadMangaItem from "../common/downloadMangaItem";

const UserDownloadList = ({ userId }) => {
    console.log(userId);
    const downloadManga = useSelector(getUploadByUser(userId));

    return (
        <div className="w-50 mx-1">
            <h2 className="text-center">Загруженное</h2>

            {downloadManga.length ? (
                <List
                    sx={{
                        bgcolor: "dark",
                        border: "1px solid #0f0f0f",
                        borderRadius: ".25rem",
                        maxHeight: "340px",
                        overflow: "auto",
                        paddingX: "10px"
                    }}
                >
                    {downloadManga.map((m, index) => (
                        <DownloadMangaItem manga={m} key={index} />
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

UserDownloadList.propTypes = {
    userId: PropTypes.string
};

export default UserDownloadList;
