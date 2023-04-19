import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const UpdateTextInput = ({
    type,
    isAdmin,
    name,
    onChange,
    onSubmit,
    value,
    options,
    defaultValue,
    children
}) => {
    const [flag, setFlag] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (flag && inputRef.current) {
            inputRef.current.focus();
        }
    }, [flag]);

    const changeFlag = () => setFlag(!flag);

    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
        if (target.name === "category") {
            changeFlag();
        }
    };

    const handleMultyChange = (value) => {
        onChange({ name: name, value });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSubmit(e);
        }
    };

    if (!isAdmin) {
        return children;
    } else {
        if (flag) {
            switch (type) {
                case "text":
                    return (
                        <form
                            onSubmit={(e) => {
                                onSubmit(e);
                                changeFlag();
                            }}
                        >
                            <input
                                type="text"
                                id={name}
                                name={name}
                                value={value}
                                onChange={handleChange}
                                ref={inputRef}
                                onBlur={changeFlag}
                            />
                        </form>
                    );
                case "textArea":
                    return (
                        <form
                            onSubmit={(e) => {
                                onSubmit(e);
                                changeFlag();
                            }}
                        >
                            <textarea
                                id={name}
                                name={name}
                                value={value}
                                onChange={handleChange}
                                ref={inputRef}
                                onBlur={changeFlag}
                            />
                        </form>
                    );
                case "radio":
                    return (
                        <form>
                            {options.map((option) => (
                                <div key={option.name + "_" + option.value}>
                                    <label
                                        className="form-check-label text-light"
                                        htmlFor={
                                            option.name + "_" + option.value
                                        }
                                    >
                                        {option.name}
                                    </label>
                                    <input
                                        type="radio"
                                        name={name}
                                        id={option.name + "_" + option.value}
                                        checked={option.value === value}
                                        value={option.value}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </form>
                    );
                case "multySelect":
                    return (
                        <form onSubmit={onSubmit}>
                            <Select
                                onBlur={() => setFlag(false)}
                                onFocus={() => setFlag(true)}
                                onKeyDown={handleKeyDown}
                                closeMenuOnSelect={false}
                                isMulti
                                defaultValue={defaultValue}
                                options={options}
                                className="basic-multi-select text-dark"
                                classNamePrefix="select"
                                onChange={handleMultyChange}
                                name={name}
                            />
                        </form>
                    );
            }
        } else {
            return <div onClick={() => changeFlag()}>{children}</div>;
        }
    }
};

UpdateTextInput.propTypes = {
    type: PropTypes.string,
    isAdmin: PropTypes.bool,
    flag: PropTypes.bool,
    changeFlag: PropTypes.func,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.array,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UpdateTextInput;
