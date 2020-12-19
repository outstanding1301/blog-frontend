import React from 'react';
import './style.scss';
import Header from '@components/common/Header';
import PostsContainer from '@containers/PostsContainer';

const HomePage = (props) => {
    return (
        <div className="HomePage">
            <Header />
            <div className="HomePage__Posts">
                <PostsContainer />
            </div>
        </div>
    )
}

export default HomePage;