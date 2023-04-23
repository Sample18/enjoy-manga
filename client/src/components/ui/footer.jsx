import React from "react";

const Footer = () => {
    return (
        <footer className="footer mt-auto p-3">
            <span className="text-light">&copy;2023 Enjoy-manga</span>
            <a
                href="https://t.me/Sample18"
                className="d-flex align-items-center link-light list-group-item"
            >
                <img
                    src="/icons/telegram.svg"
                    alt="telegram-icon"
                    width="35px"
                    className="mx-1"
                />
                <span>@Sample18</span>
            </a>
        </footer>
    );
};

export default Footer;
