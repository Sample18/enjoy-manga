import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../components/common/contentContainer";
import LoginForm from "../components/ui/loginForm/loginForm";
import NavBar from "../components/ui/navBar/navBar";
import RegisterForm from "../components/ui/registerForm/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <>
            <NavBar />
            <ContentContainer>
                {formType === "register" ? (
                    <>
                        <h1 className="text-light text-center">Регистрация</h1>
                        <RegisterForm />
                        <p className="text-light text-center">
                            Alredy have account?
                            <a role="button" onClick={toggleFormType}>
                                Sing In
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-light text-center">Вход</h1>
                        <LoginForm />
                        <p className="text-light text-center">
                            Dont have account?
                            <a role="button" onClick={toggleFormType}>
                                Sing Up
                            </a>
                        </p>
                    </>
                )}
            </ContentContainer>
        </>
    );
};

export default Login;
