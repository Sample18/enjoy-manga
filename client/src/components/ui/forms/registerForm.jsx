import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import RadioField from "../../common/form/radioField";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { singUp } from "../../../store/users";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        sex: "male",
        role: "user"
    });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должено состоять минимум из 3 символов",
                value: 3
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            const avatar = await axios.get(`https://api.waifu.pics/sfw/waifu`);
            dispatch(
                singUp({
                    ...data,
                    avatar: avatar.data.url
                })
            );
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit} className="w-50 m-auto mb-4">
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-secondary w-100 mx-auto"
            >
                Зарегестрироваться
            </button>
        </form>
    );
};

export default RegisterForm;
