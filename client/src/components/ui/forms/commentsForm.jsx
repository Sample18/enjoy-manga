import React, { useState } from "react";
import { validator } from "../../../utils/validator";
import { useDispatch } from "react-redux";
import TextAreaField from "../../common/form/textAreaField";
import PropTypes from "prop-types";
import { createComment } from "../../../store/comments";

const CommentsForm = ({ id: pageId, userId, answerId, onClick, userName }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        comment: ""
    });
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        comment: {
            isRequired: {
                message: "Поле не может быть пустым"
            },
            max: {
                value: 240
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const commentData = {
            content: !userName ? data.comment : `@${userName} ${data.comment}`,
            pageId,
            userId,
            answerId
        };
        dispatch(createComment(commentData));
        setData({ comment: "" });
        answerId && onClick();
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit} className="  mb-4 mx-4">
            <TextAreaField
                label={
                    answerId
                        ? "Оставьте ответ на комментарий"
                        : "Оставьте комментарий"
                }
                name="comment"
                value={data.comment}
                onChange={handleChange}
                error={errors.comment}
                placeholder="Не более 240 симболов"
            />
            <button
                type="submit"
                disabled={!isValid}
                className={
                    !answerId
                        ? "btn btn-secondary mx-auto w-100"
                        : "btn btn-secondary w-50"
                }
            >
                Отправить
            </button>
            {answerId && (
                <button onClick={onClick} className="btn btn-danger w-25 mx-4">
                    Закрыть
                </button>
            )}
        </form>
    );
};

CommentsForm.propTypes = {
    id: PropTypes.string,
    userId: PropTypes.string,
    answerId: PropTypes.string,
    onClick: PropTypes.func,
    userName: PropTypes.string
};
export default CommentsForm;
