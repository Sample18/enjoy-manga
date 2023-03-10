import React from "react";
import PropTypes from "prop-types";

const FileField = ({ label, name, onChange, error }) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        const file = target.files;
        const filesArr = [];
        for (let i = 0; i < file.length; i++) {
            filesArr.push(file[i]);
        }
        onChange({
            name: [target.name],
            value: filesArr
        });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="text-light">
                {label}
            </label>
            <div className="input-group has-validation">
                <input
                    type="file"
                    id={name}
                    name={name}
                    onChange={handleChange}
                    className={getInputClasses()}
                    multiple
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

FileField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default FileField;
