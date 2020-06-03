import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NewVaccine from './pages/NewVaccine';
import CreateVaccine from './pages/CreateVaccine';
import ListVaccine from './pages/ListVaccine';
import EditVaccine from './pages/EditVaccine';
import EditProfile from './pages/EditProfile';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/vaccinesxuser/new" component={NewVaccine}></Route>
                <Route path="/vaccines/new" component={CreateVaccine}></Route>
                <Route path="/listvaccine" component={ListVaccine}></Route>
                <Route path="/vaccines/edit" component={EditVaccine}></Route>
                <Route path="/edit" component={EditProfile}></Route>
            </Switch>
        </BrowserRouter>
    )
}