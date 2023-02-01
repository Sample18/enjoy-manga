import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import API from "../../api";

const Reader = () => {
    const { mangaName, ch, page } = useParams();
    const [value, setValue] = useState(page);
    const [pageImg, setPageImg] = useState("");
    const [options, setOptions] = useState([]);
    const history = useHistory();
    const imageRef = useRef();

    useEffect(() => {
        window.scrollTo(0, 0);
        API.chapters.getByPage(mangaName, ch, value).then((data) => {
            setPageImg(data.img);
            setOptions(data.length);
        });
        history.replace(`/reader/${mangaName}/${ch}/${value}`);
    }, [value]);

    const handleChange = (e) => {
        if (imageRef.current === e.target) {
            const leftSideOfImage = e.target.naturalWidth / 2;
            const userClick = e.pageX;
            return setValue((prevState) => {
                if (leftSideOfImage < userClick) {
                    if (+value !== options.length) return +prevState + 1;
                    return prevState;
                } else {
                    if (+value !== 1) return +prevState - 1;
                    return prevState;
                }
            });
        }
        if (e.target.name === "left btn" || e.target.id === "left btn") {
            return setValue((prevState) => +prevState - 1);
        }
        if (e.target.name === "right btn" || e.target.id === "right btn") {
            return setValue((prevState) => +prevState + 1);
        }
        return setValue(e.target.value);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/catalog/${mangaName}`}>
                        Enjoy Manga
                    </Link>
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-1">
                            <button
                                name="left btn"
                                disabled={+value === 1}
                                className="btn btn-outline-light"
                                onClick={handleChange}
                            >
                                <i
                                    className="bi bi-caret-left-fill"
                                    id="left btn"
                                ></i>
                                Туда
                            </button>
                        </li>
                        <li className="nav-item mx-1">
                            <button
                                name="right btn"
                                disabled={+value === options.length}
                                className="btn btn-outline-light"
                                onClick={handleChange}
                            >
                                Сюда
                                <i
                                    className="bi bi-caret-right-fill"
                                    id="right btn"
                                ></i>
                            </button>
                        </li>
                    </ul>
                    <form>
                        <select
                            className="form-select"
                            value={value}
                            onChange={handleChange}
                        >
                            {options &&
                                options.map((v, i) => (
                                    <option value={i + 1} key={i}>
                                        страница {i + 1}
                                    </option>
                                ))}
                        </select>
                    </form>
                </div>
            </nav>
            <div>
                {pageImg && (
                    <img
                        ref={imageRef}
                        src={"/" + pageImg}
                        className="w-100"
                        onClick={handleChange}
                    />
                )}
            </div>
        </>
    );
};

export default Reader;