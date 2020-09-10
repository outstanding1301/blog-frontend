import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from '../pages';
import ErrorPage from '../pages/ErrorPage';


const App = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact component={ErrorPage}/>
            </Switch>
        </div>
    )
}

export default App;