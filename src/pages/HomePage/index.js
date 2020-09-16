import React from 'react';

const HomePage = (props) => {
    return (
        <div>
            <h1>
                Home
                <br/>
                <a href="/login">Login Page</a>
                <br/>
                <a href="/register">Register Page</a>
                <br/>
                <a href="/write">Write Post Page</a>
                <br/>
                <a href="/@outstandingboy/0">Post Page</a>
                <br/>
                <a href="/@outstandingboy">Post List Page</a>
                <br/>
            </h1>
        </div>
    )
}

export default HomePage;