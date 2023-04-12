import React from "react";
import PropTypes from "prop-types";
import ItemsList from "../common/itemsList";

const UserItemsList = ({ name, items = [] }) => {
    return (
        <div className="w-50 mx-1">
            <h2 className="text-center">{name}</h2>
            <ItemsList items={items} />
        </div>
    );
};

UserItemsList.propTypes = {
    name: PropTypes.string,
    items: PropTypes.array
};

export default UserItemsList;
