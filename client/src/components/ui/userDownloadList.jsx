import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { getModerateChaptersList, getUploadByUser } from "../../store/chapters";
import DownloadMangaItem from "../common/downloadMangaItem";
import {
    getMangaUploadByUser,
    getModerateMangaList
} from "../../store/product";
import HeadingWrapper from "../common/headingWrapper";

const UserDownloadList = ({ userId, isAdmin, content }) => {
    const uploadByuser = useSelector(getUploadByUser(userId));
    const uploadMangaByUser = useSelector(getMangaUploadByUser(userId));
    const onModerateChapters = useSelector(getModerateChaptersList());
    const onModerateManga = useSelector(getModerateMangaList());

    const listStyle = {
        bgcolor: "dark",
        border: "1px solid #0f0f0f",
        borderRadius: ".25rem",
        maxHeight: "340px",
        overflow: "auto",
        paddingX: "10px"
    };

    const getContentList = () => {
        if (content === "chapters") {
            return onModerateChapters;
        }
        if (content === "manga") {
            return onModerateManga;
        }
    };

    if (isAdmin) {
        return (
            <div className="w-50 mx-1">
                <HeadingWrapper size={2} center={true}>
                    {content === "chapters"
                        ? "Главы на проверке"
                        : "Манга на проверке"}
                </HeadingWrapper>
                {getContentList().length ? (
                    <List sx={listStyle}>
                        {getContentList().map((m, index) => (
                            <DownloadMangaItem
                                manga={m}
                                key={index}
                                isAdmin={isAdmin}
                                content={content}
                            />
                        ))}
                    </List>
                ) : (
                    <ListItem sx={listStyle}>
                        <ListItemText primary="Тут пока ничего нет..." />
                    </ListItem>
                )}
            </div>
        );
    } else {
        return (
            <div className="w-50 mx-1">
                <HeadingWrapper size={2} center={true}>
                    Загруженное
                </HeadingWrapper>
                <List sx={listStyle}>
                    {uploadByuser.length &&
                        uploadByuser.map((m, index) => (
                            <DownloadMangaItem manga={m} key={index} />
                        ))}
                    {uploadMangaByUser.length &&
                        uploadMangaByUser.map((m, index) => (
                            <DownloadMangaItem manga={m} key={index} />
                        ))}
                    {!uploadByuser.length && !uploadMangaByUser.length && (
                        <ListItem>
                            <ListItemText primary="Тут пока ничего нет..." />
                        </ListItem>
                    )}
                </List>
            </div>
        );
    }
};

UserDownloadList.propTypes = {
    userId: PropTypes.string,
    isAdmin: PropTypes.bool,
    content: PropTypes.string
};

export default UserDownloadList;
