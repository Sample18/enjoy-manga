import React, { useState } from "react";
import PropTypes from "prop-types";

const ListDropContainer = ({ children }) => {
    const [collapsible, setCollapsible] = useState(false);
    return (
        <div className="list-drop-collapsWrapper w-50 m-auto mb-4 rounded-3">
            <div
                className="list-drop-content px-3"
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
