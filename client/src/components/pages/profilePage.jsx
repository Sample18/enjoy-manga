import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAdminRole, getUserById } from "../../store/users";
import ContentContainer from "../common/contentContainer";
import UserFavoritesList from "../ui/userFavoritesList";
import UserDownloadList from "../ui/userDownloadList";
import HeadingWrapper from "../common/headingWrapper";

const ProfilePage = () => {
    const { userId } = useParams();
    const user = useSelector(getUserById(userId));
    const isAdmin = useSelector(getAdminRole());

    return (
        <ContentContainer>
            {user ? (
                <div className="d-flex">
                    <div className="w-25 mx-1">
                        <img src={user.avatar} alt="avatar" className="w-100" />
                    </div>

                    <div className="w-100 text-center text-light">
                        <HeadingWrapper size={1}>{user.name}</HeadingWrapper>
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
                </div>
            ) : (
                <HeadingWrapper size={1}>
                    Данного юзера не существует
                </HeadingWrapper>
            )}
        </ContentContainer>
    );
};

export default ProfilePage;
