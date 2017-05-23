/**
 * Created by karo on 5/22/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import App from './components/App.jsx';
import dateOfBirth from './components/dateOfBirth.jsx';
import finish from './components/finish.jsx';
import Result from "./components/result.jsx";
import {createStore} from "redux";
import {Provider} from "react-redux"
import './App.css';



const initialState={
    email:"",
    password:"",
    gender:"",
    date:{
        day:"",
        mounth:"",
        year:""
    },
    hearAbout:""



}

function register(state=initialState,action){
    const { type, email ,password ,gender ,date} = action;
    switch(action.type) {
        case "EmailAndPassword":
            return Object.assign({}, state, {
                email: action.email,
                password:action.password
            })
        case "dateAndGender":
            return Object.assign({}, state, {
                date: action.date,
                gender:action.gender,
                hearAboutUs:action.about
            })
        default :return state
    }
}
const store=createStore(register);

ReactDOM.render(
    <Provider store={store}>
        <Router  >
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/dateOfBirth" component={dateOfBirth} />
                <Route path="/finish" component={finish} />
                <Route path="/result" component={Result} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app')
);






