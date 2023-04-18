import React from "react";
import NavBar from "../components/ui/navBar/navBar";
import ContentContainer from "../components/common/contentContainer";

const Authors = () => {
    return (
        <>
            <NavBar />
            <ContentContainer>
                <h1 className="text-light">В разработке</h1>
            </ContentContainer>
        </>
    );
};

export default Authors;
