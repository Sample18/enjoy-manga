import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { getModerateChaptersList, getUploadByUser } from "../../store/chapters";
import DownloadMangaItem from "../common/downloadMangaItem";
import { getAdminRole } from "../../store/users";

const UserDownloadList = ({ userId }) => {
    const uploadByuser = useSelector(getUploadByUser(userId));
    const onModerateChapters = useSelector(getModerateChaptersList());
    const isAdmin = useSelector(getAdminRole());

    if (isAdmin) {
        return (
            <div className="w-50 mx-1">
                <h2 className="text-center">На проверке</h2>

                {onModerateChapters.length ? (
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
                        {onModerateChapters.map((m, index) => (
                            <DownloadMangaItem
                                manga={m}
                                key={index}
                                isAdmin={isAdmin}
                            />
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
    } else {
        return (
            <div className="w-50 mx-1">
                <h2 className="text-center">Загруженное</h2>

                {uploadByuser.length ? (
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
                        {uploadByuser.map((m, index) => (
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
    }
};

UserDownloadList.propTypes = {
    userId: PropTypes.string
};

export default UserDownloadList;
