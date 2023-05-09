import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, getUserById } from "../../store/users";
import { Avatar } from "@mui/material";
import moment from "moment/moment";
import "moment/locale/ru";
import SpanWrapper from "./spanWrapper";
import { deleteComment } from "../../store/comments";
import RemoveButton from "./removeButton";
import CommentsForm from "../ui/forms/commentsForm";
import { Link } from "react-router-dom";

const Comment = ({ comment, children, ...rest }) => {
    const [formOpen, setFormOpen] = useState(false);
    const user = useSelector(getUserById(comment.userId));
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const handleRemoveComment = (id) => dispatch(deleteComment(id));
    moment.locale("ru");
    const handleOpen = () => setFormOpen(!formOpen);
    const transformString = (str) => {
        const regex = /@\S+/;

        const match = str.match(regex);

        if (match) {
            return (
                <>
                    <i className="text-danger">{match[0]}</i>
                    <SpanWrapper>{str.replace(regex, "")}</SpanWrapper>
                </>
            );
        } else {
            return <SpanWrapper>{str}</SpanWrapper>;
        }
    };

    return (
        <div
            className={
                !rest.parent
                    ? "d-flex border border-secondary mb-2 comment"
                    : "d-flex border-start border-secondary pb-2 comment"
            }
        >
            <div className="m-2 ">
                <Avatar
                    src={user.avatar}
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                />
            </div>
            <div className="d-flex flex-column w-100">
                <div className="d-flex w-100 border-bottom border-secondary">
                    <h5 className="m-0 me-auto ">
                        <Link className="page-link" to={`/profile/${user._id}`}>
                            {user.name}
                        </Link>
                    </h5>
                    <div className="mx-1">
                        <span className="m-0 mx-2">
                            {moment(comment.created_at).format("LL LT")}
                        </span>
                        {currentUser && user._id === currentUser._id && (
                            <RemoveButton
                                onClick={() => handleRemoveComment(comment._id)}
                            />
                        )}
                    </div>
                </div>
                <div>{transformString(comment.content)}</div>
                {currentUser && (
                    <span
                        className={!formOpen ? "comment-reply" : "hide-content"}
                        onClick={handleOpen}
                    >
                        <i className="bi bi-arrow-90deg-up"></i>
                        <span className="text-light">Ответить</span>
                    </span>
                )}
                {children}
                {formOpen &&
                    (rest.parent === "last" ? (
                        <CommentsForm
                            onClick={handleOpen}
                            answerId={comment.answerId}
                            userId={currentUser._id}
                            id={comment.pageId}
                            userName={user.name}
                        />
                    ) : (
                        <CommentsForm
                            onClick={handleOpen}
                            answerId={comment._id}
                            userId={currentUser._id}
                            id={comment.pageId}
                        />
                    ))}
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Comment;
