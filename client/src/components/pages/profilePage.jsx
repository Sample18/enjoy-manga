import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../store/users";
import ContentContainer from "../common/contentContainer";
import NavBar from "../ui/navBar";
import UserFavoritesList from "../ui/userFavoritesList";
import UserDownloadList from "../ui/userDownloadList";

const ProfilePage = () => {
    const { userId } = useParams();
    const user = useSelector(getUserById(userId));

    return (
        <>
            <NavBar />
            <ContentContainer>
                {user ? (
                    <div className="d-flex">
                        <div className="w-25 mx-1">
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className="w-100"
                            />
                        </div>

                        <div className="w-100 text-light">
                            <h1 className="text-center">{user.name}</h1>
                            <div className="d-flex w-100">
                                <UserFavoritesList
                                    favs={
                                        user.favorites && user.favorites.length
                                            ? user.favorites
                                            : []
                                    }
                                />
                                <UserDownloadList userId={user._id} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1 className="text-light">Данного юзера не существует</h1>
                )}
            </ContentContainer>
        </>
    );
};

// ProfilePage.propTypes = {

// };

export default ProfilePage;
