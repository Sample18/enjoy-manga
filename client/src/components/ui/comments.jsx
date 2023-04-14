import React, { useState } from "react";
import PaginationHOC from "./pagination";
import Paginate from "../../utils/paginate";
import _ from "lodash";
import PropTypes from "prop-types";
import Comment from "../common/comment";
import { useSelector } from "react-redux";
import { getUsersListLoadingStatus } from "../../store/users";

const Comments = ({ comments }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const count = comments ? comments.length : 1;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    const paginateComments = Paginate(sortedComments, currentPage, pageSize);
    const isLoadingUsers = useSelector(getUsersListLoadingStatus());

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    return (
        <div className="card text-white bg-dark mx-4 border-secondary">
            <div className="card-header border-bottom border-secondary">
                <h5 className="card-title text-center">Комментарии к манге</h5>
            </div>
            <div className="card-body">
                {paginateComments.length !== 0 && !isLoadingUsers ? (
                    paginateComments.map((c) => (
                        <Comment key={c.id} comment={c} />
                    ))
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