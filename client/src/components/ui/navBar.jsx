import React, { useEffect, useState } from "react";
import DropDownMenu from "./dropDownMenu";
import { Link, useHistory } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getMangaList } from "../../store/product";
import { getIsLoggedIn } from "../../store/users";
import { Tooltip } from "@mui/material";

const NavBar = () => {
    const history = useHistory();
    const isLogin = useSelector(getIsLoggedIn());

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
            link: "/authors",
            name: "Авторы"
        }
    ];

    const manga = useSelector(getMangaList());
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        if (manga) {
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
        <header className="d-flex justify-content-between align-items-center p-3 border border-dark">
            <div className="d-flex align-items-center text-light">
                <DropDownMenu items={dropDownPages} />
                <Link className="nav-link" to="/">
                    <h5 className="m-0 px-2">Enjoy Manga</h5>
                </Link>
            </div>
            <div className="searchWrapper">
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
                            ? "list-group searchSuggestions"
                            : "list-group searchSuggestions hide"
                    }
                >
                    {content &&
                        content.map((c) => (
                            <Link
                                className="list-group-item list-group-item-action list-group-item-dark"
                                key={c._id}
                                to={`/catalog/${c.name
                                    .toLowerCase()
                                    .replace(/ /g, "")}`}
                            >
                                {c.nameRu}
                            </Link>
                        ))}
                </ul>
            </div>
            <div className="d-flex align-items-center">
                {isLogin && (
                    <Tooltip title="Добавить главу">
                        <i
                            className="bi bi-box-arrow-down text-light fs-5 me-4 c-pointer"
                            onClick={() => history.push("/download")}
                        ></i>
                    </Tooltip>
                )}

                <div className="d-flex align-items-center user_menu">
                    {isLogin ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link text-light" to="/login">
                            Вход/Регистрация
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;
