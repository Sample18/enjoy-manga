import React, { useState } from "react";
import PropTypes from "prop-types";
import PaginationHOC from "../pagination/pagination";
import Paginate from "../../../utils/paginate";
import _ from "lodash";

const Comments = ({ comments }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const count = comments.length;
    const pageSize = 10;
    const pagesCount = Math.ceil(count / pageSize);
    const paginateComments = Paginate(comments, currentPage, pageSize);
    const sortedComments = _.orderBy(
        paginateComments,
        ["created_at"],
        ["desc"]
    );

    const handlePageChange = ({ target }) => {
        setCurrentPage(Number(target.innerText));
    };

    return (
        <div className="card text-white bg-dark mx-4 border-secondary">
            <div className="card-header border-bottom border-secondary">
                <h5 className="card-title text-center">Комментарии к манге</h5>
            </div>
            <div className="card-body">
                {sortedComments.length !== 0 ? (
                    sortedComments.map((c) => (
                        <p className="card-text" key={c._id}>
                            {c.content}
                        </p>
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
