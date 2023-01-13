import React from "react";
import styles from "./dropDownMenu.module.css";
import PropTypes from "prop-types";

const DropDownMenu = ({ dropdown, items }) => {
  return (
    dropdown && (
      <ul className={styles.dropdown}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )
  );
};

DropDownMenu.propTypes = {
  dropdown: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
};

export default DropDownMenu;
