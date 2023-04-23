import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../components/common/contentContainer";
import LoginForm from "../components/ui/forms/loginForm";
import RegisterForm from "../components/ui/forms/registerForm";
import HeadingWrapper from "../components/common/headingWrapper";

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
        <ContentContainer>
            {formType === "register" ? (
                <>
                    <HeadingWrapper size={1} center={true}>
                        Регистрация
                    </HeadingWrapper>
                    <RegisterForm />
                    <p className="text-light text-center">
                        Уже есть аккаунт?
                        <a role="button" onClick={toggleFormType}>
                            Войти
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <HeadingWrapper size={1} center={true}>
                        Вход
                    </HeadingWrapper>
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
    );
};

export default Login;
