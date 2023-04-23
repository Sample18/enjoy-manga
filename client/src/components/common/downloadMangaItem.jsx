import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "@mui/material";
import BadgeWrapper from "./badgeWrapper";
import { useDispatch } from "react-redux";
import { updateChapter } from "../../store/chapters";
import { updateManga } from "../../store/product";
import RemoveButton from "./removeButton";
import AcceptButton from "./acceptButton";

const DownloadMangaItem = ({ manga, isAdmin, content }) => {
    const dispatch = useDispatch();
    const moderateConfig = {};
    switch (manga.moderateStatus) {
        case "onCheck":
            moderateConfig.color = "warning";
            moderateConfig.title = "На проверке";
            break;
        case "accepted":
            moderateConfig.color = "success";
            moderateConfig.title = "Проверено";
            break;
        case "notAccepted":
            moderateConfig.color = "danger";
            moderateConfig.title = "Не одобрено";
            break;

        default:
            break;
    }

    const changeStatus = (status) => {
        switch (status) {
            case "accepted":
                if (content === "chapters") {
                    dispatch(
                        updateChapter({ ...manga, moderateStatus: status })
                    );
                }
                if (content === "manga") {
                    dispatch(updateManga({ ...manga, moderateStatus: status }));
                }
                break;
            case "notAccepted":
                if (content === "chapters") {
                    dispatch(
                        updateChapter({ ...manga, moderateStatus: status })
                    );
                }
                if (content === "manga") {
                    dispatch(updateManga({ ...manga, moderateStatus: status }));
                }
                break;
        }
    };

    if (isAdmin) {
        return (
            <ListItem
                sx={{
                    border: "1px solid #0f0f0f",
                    borderRadius: ".25rem",
                    marginBottom: "5px"
                }}
            >
                <ListItemText>
                    <div className="d-flex justify-content-between">
                        {manga.name}
                        <div className="d-flex">
                            <AcceptButton
                                onClick={() => changeStatus("accepted")}
                            />
                            <BadgeWrapper color={moderateConfig.color}>
                                {moderateConfig.title}
                            </BadgeWrapper>
                            <RemoveButton
                                onClick={() => changeStatus("notAccepted")}
                            />
                        </div>
                    </div>
                </ListItemText>
            </ListItem>
        );
    } else {
        return (
            <ListItem
                sx={{
                    border: "1px solid #0f0f0f",
                    borderRadius: ".25rem",
                    marginBottom: "10px"
                }}
            >
                <ListItemText>
                    <div className="d-flex justify-content-between">
                        {manga.name}
                        <BadgeWrapper color={moderateConfig.color}>
                            {moderateConfig.title}
                        </BadgeWrapper>
                    </div>
                </ListItemText>
            </ListItem>
        );
    }
};

DownloadMangaItem.propTypes = {
    manga: PropTypes.object,
    isAdmin: PropTypes.bool,
    content: PropTypes.string
};

export default DownloadMangaItem;
