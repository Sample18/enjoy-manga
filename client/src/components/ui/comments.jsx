import React, { useState } from "react";
import Paginate from "../../utils/paginate";
import _ from "lodash";
import PropTypes from "prop-types";
import Comment from "../common/comment";
import { useSelector } from "react-redux";
import { getUsersListLoadingStatus } from "../../store/users";
import PaginationHOC from "../hoc/pagination";
import { Tooltip } from "@mui/material";

const Comments = ({ comments }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [hide, setHide] = useState({});
    const filtredComments = comments
        ? comments.filter(
              (c) => !Object.prototype.hasOwnProperty.call(c, "answerId")
          )
        : comments;
    const answers = comments
        ? comments.filter((c) =>
              Object.prototype.hasOwnProperty.call(c, "answerId")
          )
        : null;
    const count = filtredComments ? filtredComments.length : 1;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const sortedComments = _.orderBy(filtredComments, ["created_at"], ["desc"]);
    const paginateComments = Paginate(sortedComments, currentPage, pageSize);
    const isLoadingUsers = useSelector(getUsersListLoadingStatus());

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const hideComments = (comments, parentIndex) => {
        if (comments.length < 3) {
            return comments.map((a) => (
                <Comment key={a._id} comment={a} parent="last" />
            ));
        } else {
            if (!hide[parentIndex]) {
                return (
                    <>
                        {comments.slice(0, 2).map((a) => (
                            <Comment key={a._id} comment={a} parent="last" />
                        ))}
                        <Tooltip title="Показать ответы">
                            <span
                                className={
                                    !hide[parentIndex]
                                        ? "comment-reply"
                                        : "hide-content"
                                }
                                onClick={() =>
                                    setHide((prevState) => ({
                                        ...prevState,
                                        [parentIndex]: true
                                    }))
                                }
                            >
                                <i className="bi bi-arrow-bar-down fs-4 m-auto"></i>
                            </span>
                        </Tooltip>
                    </>
                );
            } else {
                return (
                    <>
                        {comments.map((a) => (
                            <Comment key={a._id} comment={a} parent="last" />
                        ))}
                        <Tooltip title="Скрыть">
                            <span
                                className={
                                    hide[parentIndex]
                                        ? "comment-reply"
                                        : "hide-content"
                                }
                                onClick={() =>
                                    setHide((prevState) => ({
                                        ...prevState,
                                        [parentIndex]: false
                                    }))
                                }
                            >
                                <i className="bi bi-arrow-bar-up fs-3 m-auto"></i>
                            </span>
                        </Tooltip>
                    </>
                );
            }
        }
    };

    return (
        <div className="card text-white bg-dark mx-4 border-secondary">
            <div className="card-header border-bottom border-secondary">
                <h5 className="card-title text-center">Комментарии к манге</h5>
            </div>
            <div className="card-body">
                {paginateComments.length !== 0 && !isLoadingUsers ? (
                    paginateComments.map((c) => {
                        if (answers) {
                            const answersList = answers.filter(
                                (a) => a.answerId === c._id
                            );
                            return (
                                <Comment key={c._id} comment={c}>
                                    {answersList.map((a) => {
                                        const ansFilter = answers.filter(
                                            (ans) => a._id === ans.answerId
                                        );
                                        return (
                                            <Comment
                                                key={a._id}
                                                comment={a}
                                                parent={"second-" + a._id}
                                            >
                                                {ansFilter &&
                                                    hideComments(
                                                        ansFilter,
                                                        a._id
                                                    )}
                                            </Comment>
                                        );
                                    })}
                                </Comment>
                            );
                        }
                        return <Comment key={c._id} comment={c} />;
                    })
                ) : (
                    <p className="card-text">Здесь пока нет комментариев</p>
                )}
            </div>
            {pagesCount !== 1 && (
                <div className="d-flex justify-content-center mb-1">
                    <PaginationHOC
                        count={pagesCount}
                        onChange={handlePageChange}
                        page={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

Comments.propTypes = {
    comments: PropTypes.array
};

export default Comments;
