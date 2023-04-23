import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useReader } from "../../hooks/useReader";

const ReaderPage = () => {
    const { pageData, imageChangeLeft, imageChangeRight, changeImage, page } =
        useReader();
    const imageRef = useRef();
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    useEffect(() => {
        header.style.display = "none";
        footer.style.display = "none";
    }, []);

    useEffect(() => {
        return () => {
            header.style.display = "flex";
            footer.style.display = "flex";
        };
    }, []);

    const handleChange = (e) => {
        changeImage(e, imageRef.current);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/catalog`}>
                        Enjoy Manga
                    </Link>
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <button
                            name="left btn"
                            disabled={+page === 1}
                            className="btn btn-outline-light nav-item mx-1"
                            onClick={() => imageChangeLeft()}
                        >
                            <i
                                className="bi bi-caret-left-fill"
                                id="left btn"
                            ></i>
                            Туда
                        </button>
                        <button
                            name="right btn"
                            disabled={+page === pageData.content.length}
                            className="btn btn-outline-light nav-item mx-1"
                            onClick={() => imageChangeRight()}
                        >
                            Сюда
                            <i
                                className="bi bi-caret-right-fill"
                                id="right btn"
                            ></i>
                        </button>
                    </ul>
                    <form>
                        <select
                            className="form-select"
                            value={page}
                            onChange={handleChange}
                        >
                            {pageData.content.map((v, i) => (
                                <option value={i + 1} key={i}>
                                    страница {i + 1}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
            </nav>
            <div>
                <img
                    ref={imageRef}
                    src={pageData.img}
                    className="w-100"
                    onClick={handleChange}
                />
            </div>
        </>
    );
};

export default ReaderPage;
