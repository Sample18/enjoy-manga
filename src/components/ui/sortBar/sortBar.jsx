import React from "react";
import styles from "./sortBar.module.css";
import PropTypes from "prop-types";

const SortBar = ({ heading, formVisible }) => {
    const { sortBarWrapper, sortBarHeading, sortSelectWrapper } = styles;
    return (
        <div className={sortBarWrapper}>
            <h2 className={sortBarHeading}>{heading}</h2>
            {formVisible && (
                <form className={sortSelectWrapper}>
                    <label htmlFor="sortSelect" className="text-white mx-2">
                        Сортировать по:
                    </label>
                    <select
                        id="sortSelect"
                        className=""
                        // value={value}
                        // onChange={handleChange}
                    >
                        <option>алфавиту</option>
                        <option>популярности</option>
                        {/* {options &&
            options.map((v, i) => (
                <option value={i + 1} key={i}>
                    страница {i + 1}
                </option>
            ))} */}
                    </select>
                </form>
            )}
        </div>
    );
};

SortBar.defaultProps = {
    formVisible: true
};

SortBar.propTypes = {
    heading: PropTypes.string,
    formVisible: PropTypes.bool
};

export default SortBar;
