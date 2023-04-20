import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "@mui/material";
import BadgeWrapper from "./badgeWrapper";

const DownloadMangaItem = ({ manga }) => {
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
    return (
        <ListItem
            sx={{
                border: "1px solid #0f0f0f",
                borderRadius: ".25rem"
            }}
        >
            <ListItemText>
                {manga.name}{" "}
                <BadgeWrapper color={moderateConfig.color}>
                    {moderateConfig.title}
                </BadgeWrapper>
            </ListItemText>
        </ListItem>
    );
};

DownloadMangaItem.propTypes = {
    manga: PropTypes.object
};

export default DownloadMangaItem;
