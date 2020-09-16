import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage, PostListPage, PostPage, RegisterPage, WritePage } from '../pages';
import ErrorPage from '../pages/ErrorPage';


const App = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/write" component={WritePage}/>
                <Route exact path="/@:username/:postId" component={PostPage}/>
                <Route exact path="/@:username" component={PostListPage}/>
                <Route exact component={ErrorPage}/>
            </Switch>
        </div>
    )
}

export default App;