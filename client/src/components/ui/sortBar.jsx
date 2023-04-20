import React from "react";
import PropTypes from "prop-types";

const SortBar = ({ heading, formVisible, onChange, sortOn }) => {
    return (
        <div className="sortBarWrapper">
            <h2 className="sortBarHeading">{heading}</h2>
            {formVisible && (
                <form className="sortSelectWrapper">
                    <label htmlFor="sortSelect" className="text-white mx-2">
                        Сортировать по:
                    </label>
                    <select id="sortSelect" onChange={onChange}>
                        {sortOn.map((item, key) => (
                            <option key={key} value={item}>
                                {item}
                            </option>
                        ))}
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
    formVisible: PropTypes.bool,
    onChange: PropTypes.func,
    sortOn: PropTypes.array
};

export default SortBar;
