import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getAdminRole,
    getCurrentUserData,
    getUserById,
    updateUser
} from "../../store/users";
import ContentContainer from "../common/contentContainer";
import UserFavoritesList from "../ui/userFavoritesList";
import UserDownloadList from "../ui/userDownloadList";
import HeadingWrapper from "../common/headingWrapper";
import FileField from "../common/form/fileField";
import ModalBox from "../ui/modalBox";
import { validator } from "../../utils/validator";
import { storage } from "../../services/fireBaseStorage.service";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getChaptersList } from "../../store/chapters";
import UserReadList from "../ui/userReadList";
import Loader from "../ui/loader";
import UserFullReadList from "../ui/userFullReadList";

const ProfilePage = () => {
    const { userId } = useParams();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        avatar: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    const currentUser = useSelector(getCurrentUserData());
    const user = useSelector(getUserById(userId));
    const isAdmin = useSelector(getAdminRole());
    const chapters = useSelector(getChaptersList());

    const dispatch = useDispatch();

    const validatorConfig = {
        avatar: {
            isImages: {
                message: "Файл не является изображением или отсутствует"
            }
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setData({ avatar: "" });
    };
    const handleClose = () => setOpen(false);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    function uploadData(data) {
        setLoading(true);
        const imagesRef = ref(
            storage,
            `avatars/${user._id}/${user.name}_avatar`
        );
        const uploadData = uploadBytesResumable(imagesRef, data.avatar[0]);
        uploadData.on(
            "state_changed",
            () => {},
            (error) => {
                console.log(error);
                setLoading(false);
            },
            () => {
                getDownloadURL(uploadData.snapshot.ref).then((url) => {
                    dispatch(updateUser({ ...user, avatar: url }));
                    toast.success("Аватар загружен!");
                    setLoading(false);
                    handleClose();
                });
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        uploadData(data);
    };

    const getReadingContent = (chapters, user) => {
        if (user.reading.length > 0) {
            const userChapters = user.reading.map((id) =>
                chapters.find((c) => c._id === id)
            );

            const userManga = [...new Set(userChapters.map((c) => c.mangaId))];
            const lastChapters = userManga.map((c) => ({
                mangaId: c,
                alredyRead:
                    chapters.filter((chapter) => chapter.mangaId === c)
                        .length ===
                    userChapters
                        .filter((chapter) => chapter.mangaId === c)
                        .map((c) => +c.number).length,
                lastChapter: userChapters
                    .filter((chapter) => chapter.mangaId === c)
                    .map((c) => +c.number)
                    .sort((a, b) => b - a)[0]
            }));
            return lastChapters;
        }
        return [];
    };

    return (
        <ContentContainer>
            {user ? (
                <>
                    <div className="mx-4 text-light mb-4">
                        <div className="w-100 d-flex text-light bg-dark mb-4 p-4">
                            <div className="mx-2">
                                <HeadingWrapper size={1}>
                                    {user.name}
                                </HeadingWrapper>
                            </div>
                            <div className="w-25 mx-1 ms-auto">
                                {currentUser && currentUser._id === userId ? (
                                    <div
                                        className="avatar-container"
                                        onClick={handleOpen}
                                    >
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            className="w-100"
                                        />
                                        <span className="avatar-download">
                                            загрузить аватар
                                        </span>
                                    </div>
                                ) : (
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-100"
                                    />
                                )}
                                <ModalBox
                                    open={open}
                                    onClose={handleClose}
                                    title={"Сменить аватар"}
                                >
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mb-4"
                                    >
                                        <FileField
                                            isMultiple={false}
                                            name={"avatar"}
                                            value={data.avatar}
                                            onChange={handleChange}
                                            error={errors.avatar}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-secondary mx-auto w-100"
                                        >
                                            Отправить
                                        </button>
                                    </form>
                                    {isLoading && (
                                        <div
                                            className="spinner-border text-success"
                                            role="status"
                                        ></div>
                                    )}
                                </ModalBox>
                            </div>
                        </div>
                        {isAdmin ? (
                            <div className="d-flex w-100">
                                <UserDownloadList
                                    userId={user._id}
                                    isAdmin={isAdmin}
                                    content={"manga"}
                                />
                                <UserDownloadList
                                    userId={user._id}
                                    isAdmin={isAdmin}
                                    content={"chapters"}
                                />
                            </div>
                        ) : (
                            <div className="d-flex w-100">
                                <UserFavoritesList
                                    favs={
                                        user.favorites && user.favorites.length
                                            ? user.favorites
                                            : []
                                    }
                                />
                                <UserDownloadList
                                    userId={user._id}
                                    isAdmin={isAdmin}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mx-4">
                        <HeadingWrapper size={3} center={true}>
                            Прогресс чтения
                        </HeadingWrapper>
                        {chapters ? (
                            <div className="d-flex">
                                <UserReadList
                                    readingContent={getReadingContent(
                                        chapters,
                                        user
                                    )}
                                />
                                <UserFullReadList
                                    readingContent={getReadingContent(
                                        chapters,
                                        user
                                    )}
                                />
                            </div>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </>
            ) : (
                <HeadingWrapper size={1}>
                    Данного юзера не существует
                </HeadingWrapper>
            )}
        </ContentContainer>
    );
};

export default ProfilePage;
