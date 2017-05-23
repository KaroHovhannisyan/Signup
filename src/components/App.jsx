import React, { Component } from 'react';
import {connect} from "react-redux";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import LeftIcon from 'material-ui/svg-icons/action/trending-flat';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import '../App.css';

const InputStyle={
    marginLeft:9
}



class App extends Component {

    constructor(props) {
        super(props);
            this.state = {
            email: "",
            password: "",
            nextStep: false,
            emailError: "",
            passwordError :"",
            passwordMatchError:""
        }
    }

    mailValidator(e)   {
        var email=e.target.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) {
            this.setState ({email: email,
                            emailError:""});
        }else {this.setState ({emailError:"Incorrect email address"})}
    }

    password(e){
        var password =  e.target.value;
        if(password.length < 6){
            this.setState({passwordError:"Password should be minimum 6 characters longs"});
        }
        else
        this.setState({password:password,
                       passwordError:""});
    }

    nextStep(){
        const {email,password,nextStep} = this.state;
        if(email && password && nextStep ){
            this.props.history.replace("/dateOfBirth");
            this.props.addEmailPassword(this.state.email,this.state.password);

        }
        else if(!nextStep && email && password){
            this.setState({passwordMatchError:"Don`t forget to Match Password"})

        }else this.setState ({emailError:"Enter Email",
                             passwordError:"Enter Password"});
    }



    confirm(e){
        var confirm = e.target.value;
        if(confirm ===  this.state.password){
            this.setState({passwordMatchError:"",
                           nextStep:true});
        }else
            this.setState({passwordMatchError:"Password Don`t Match"});


    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div className="App">
                <div className="header">Signup
                    <progress value="30" max="100" />
                </div>
                <div className="registerForm">
                    <h1 style={{color: '#ff0505'}}>Email is Required</h1>
                    <TextField
                        errorText={this.state.emailError}
                        errorStyle ={{fontSize:9}}
                        id="Email"
                        style={InputStyle}
                        onBlur={this.mailValidator.bind(this)}
                         />
                    <h1>Password</h1>
                    <TextField
                        errorText ={this.state.passwordError}
                        errorStyle ={{fontSize:9}}
                        type ="password"
                        onBlur ={this.password.bind(this)}
                        style={InputStyle}
                    />
                    <h1>CONFIRM PASSWORD</h1>
                    <TextField
                         errorText={this.state.passwordMatchError}
                         errorStyle ={{fontSize:9}}
                         type="password"
                         onBlur={this.confirm.bind(this)}
                         style={InputStyle}

                    />
                </div>
                <Divider/>
                <div className="nextStep">
                    <FlatButton
                        label="Next"
                        labelPosition="before"
                        primary={true}
                        onClick={this.nextStep.bind(this)}
                        icon = {<LeftIcon/>}
                    ></FlatButton>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({fisrtStep:state});

export default connect(
    mapStateToProps,
    dispatch =>({
        addEmailPassword:(email,password)=>{dispatch({type:"EmailAndPassword", email:email,password:password})}
    }))(App);