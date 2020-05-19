import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewVaccine from './pages/NewVaccine';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/vaccinesxuser/new" component={NewVaccine}></Route>
            </Switch>
        </BrowserRouter>
    )
}