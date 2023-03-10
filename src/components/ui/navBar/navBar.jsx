import React, { useEffect, useState } from "react";
import DropDownMenu from "../dropDown/dropDownMenu";
import styles from "./navBar.module.css";
import { useProduct } from "../../../hooks/useProduct";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
    const { bg, searchSuggestions, hide, searchWrapper } = styles;
    const history = useHistory();

    const dropDownPages = [
        {
            link: "/catalog",
            name: "Каталог"
        },
        {
            link: "/genres",
            name: "Жанры"
        },
        {
            link: "/catalog",
            name: "Авторы"
        },
        {
            link: "/",
            name: "На главную"
        }
    ];

    const { manga } = useProduct();
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        if (manga.length !== 0) {
            const findManga =
                value.length > 2
                    ? manga.filter(
                          (m) =>
                              m.nameRu
                                  .toLowerCase()
                                  .indexOf(value.toLowerCase()) !== -1
                      )
                    : [];
            setContent(findManga);
        }
        setFocus(value.length > 2);
    }, [value]);

    const handleChange = ({ target }) => {
        setValue(target.value);
    };

    return (
        <header
            className={
                "d-flex justify-content-between align-items-center p-3 border border-dark " +
                bg
            }
        >
            <div className="d-flex align-items-center text-light">
                <DropDownMenu items={dropDownPages} />
                <h5 className="m-0 px-2">Enjoy Manga</h5>
            </div>
            <div className={searchWrapper}>
                <input
                    type="search"
                    className="w-100 form-control"
                    value={value}
                    placeholder="Ищем мангу по названию..."
                    onChange={handleChange}
                />
                <ul
                    className={
                        !focus
                            ? "list-group " + searchSuggestions
                            : "list-group " + searchSuggestions + " " + hide
                    }
                >
                    {content &&
                        content.map((c) => (
                            <Link
                                className="list-group-item list-group-item-action list-group-item-dark"
                                key={c.id}
                                to={`/catalog/${c.name
                                    .toLowerCase()
                                    .replace(/ /g, "")}`}
                            >
                                {c.nameRu}
                            </Link>
                        ))}
                </ul>
            </div>
            <button
                className="btn btn-dark"
                onClick={() => history.push("/download")}
            >
                <i className="bi bi-box-arrow-down text-light  fs-5"></i>
            </button>

            <div className="user_menu"></div>
        </header>
    );
};

export default NavBar;
