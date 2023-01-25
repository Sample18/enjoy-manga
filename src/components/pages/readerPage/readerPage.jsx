import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../api";
// import PropTypes from "prop-types";

const Reader = () => {
    const [pageImg, setPageImg] = useState("");
    const { mangaName, ch, page } = useParams();

    useEffect(() => {
        API.product
            .getByPage(mangaName, ch, page)
            .then((data) => setPageImg(data));
    }, [page]);

    const handlePageChange = (bool) => {
        return bool
            ? "/reader/" + mangaName + "/" + ch + "/" + (Number(page) + 1)
            : "/reader/" + mangaName + "/" + ch + "/" + (Number(page) - 1);
    };

    console.log(page);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Enjoy Manga
                    </Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={handlePageChange(false)}
                            >
                                <i className="bi bi-caret-left-fill"></i>
                                Туда
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={handlePageChange(true)}
                            >
                                Сюда
                                <i className="bi bi-caret-right-fill"></i>
                            </Link>
                        </li>
                    </ul>
                    <form>
                        <select className="form-select">
                            <option value="1" selected>
                                1
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </form>
                </div>
            </nav>
            <div>
                {pageImg && <img src={"/" + pageImg} className="w-100" />}
            </div>
        </>
    );
};

// Reader.propTypes = {};

export default Reader;
