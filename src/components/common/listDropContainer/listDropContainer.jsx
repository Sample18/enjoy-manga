import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./listDropContainer.module.css";

const ListDropContainer = ({ children }) => {
    const [collapsible, setCollapsible] = useState(false);
    const { collapsWrapper, content } = styles;
    return (
        <div className={collapsWrapper + " w-50 m-auto rounded-3"}>
            <div
                className={content + " px-3"}
                style={{
                    height: `${collapsible ? 41 * children.length : 41 * 2}px`
                }}
            >
                {children}
            </div>
            <button
                className="btn btn-secondary w-100 mt-3"
                onClick={() => setCollapsible((prevState) => !prevState)}
            >
                {collapsible ? "Свернуть" : "Развернуть"}
            </button>
        </div>
    );
};

ListDropContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ListDropContainer;
