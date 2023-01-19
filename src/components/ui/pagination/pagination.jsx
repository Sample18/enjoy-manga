import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import styles from "./pagination.module.css";

const Pagination = ({ itemsCount, pageSize, onChange, currentPage }) => {
    const { bg, bg2 } = styles;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={"mx-1 " + (currentPage === page ? bg2 : "")}
                    >
                        <button
                            className={"p-2 text-white rounded-3 " + bg}
                            onClick={() => onChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
