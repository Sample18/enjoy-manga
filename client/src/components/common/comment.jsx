import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, getUserById } from "../../store/users";
import { Avatar } from "@mui/material";
import moment from "moment/moment";
import "moment/locale/ru";
import SpanWrapper from "./spanWrapper";
import { deleteComment } from "../../store/comments";

const Comment = ({ comment }) => {
    const user = useSelector(getUserById(comment.userId));
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const handleRemoveComment = (id) => dispatch(deleteComment(id));
    moment.locale("ru");

    return (
        <div className="d-flex border border-secondary mb-2">
            <div className="m-2 ">
                <Avatar
                    src={user.avatar}
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                />
            </div>
            <div className="d-flex flex-column w-100">
                <div className="d-flex w-100 border-bottom border-secondary">
                    <h5 className="m-0 me-auto ">{user.name}</h5>
                    <div className="mx-1">
                        <span className="m-0 mx-2">
                            {moment(comment.created_at).format("LL LT")}
                        </span>
                        {user._id === currentUser._id && (
                            <span
                                className="delete-comment"
                                onClick={() => handleRemoveComment(comment._id)}
                            >
                                &#10005;
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <SpanWrapper>{comment.content}</SpanWrapper>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object
};

export default Comment;
