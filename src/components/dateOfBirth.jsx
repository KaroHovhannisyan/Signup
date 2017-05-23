import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import {connect} from "react-redux";
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import LeftIcon from 'material-ui/svg-icons/action/trending-flat';
import '../App.css';

const Leftstyle = {
    marginRight: 35,
};
const RightStyle = {
    marginLeft: 35,
};



class dateOfBirth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date:{day:"",mounth:"",year:""},
            gender:"",
            hearAboutUs:"None" ,
            indexOfMenu:0,
        };
    }

    prev(){
        this.props.history.replace("/");
    }
    finish(){
        if (this.state.date && this.state.gender){
            this.props.addDateAndGender(this.state.date,this.state.gender,this.state.hearAboutUs);
            this.props.history.replace("/finish");
        }
        else alert("Inputs are empty")
    }

    setYear(e){
        if(e.target.value  === "" ){this.setState({date:{year:"",day:this.state.date.day,mounth:this.state.date.mounth}});}
        if(!isNaN(e.target.value))
        {
            var birthYear=parseInt(e.target.value);
            var date =new Date();
            var userAge=date.getFullYear()- birthYear;
            if(userAge>=18){
                document.getElementById("datestatus").innerHTML="";
                this.setState({date:{year:birthYear,
                    day:this.state.date.day,
                    mounth:this.state.date.mounth}});
            }else
                document.getElementById("datestatus").innerHTML="**User Must be Old than 17";


        }
    }



    setDay(e) {
        if (e.target.value === "") {
            this.setState({date: {year:this.state.year,
                day:"",
                mounth:this.state.date.mounth}});
        }
        if (!isNaN(e.target.value)) {
            var day = parseInt(e.target.value);

            if (day > 0 && day < 32) {
                this.setState({date: {year:this.state.year,
                    day:day,
                    mounth:this.state.date.mounth}});

            }
        }
    }

    setMounth(e){
        if(e.target.value===""){this.setState({date:{year:this.state.year,
            day:this.state.date.day,
            mounth:""}});}
        if(!isNaN(e.target.value))
        {
            var mounth = parseInt(e.target.value);
            if (mounth > 0 && mounth < 13) {
                this.setState({date: {year:this.state.year,   /// I Try ...spread ES6 but Webpack Don`t Understand
                    day:this.state.date.day,
                    mounth:mounth}});
            }
        }
    }
     hearAboutUs  (e) {
         var info =e.target.innerHTML;
         this.setState({hearAboutUs: e.target.innerHTML});
        switch (info){
            case "From Internet ":this.setState({indexOfMenu:1});break;
            case "From Friends ":this.setState({indexOfMenu:2});break;
            case "Other":this.setState({indexOfMenu:3});break;
        }
     }


    componentDidUpdate(){
        console.log('Did update in Date');
        console.log(this.state);
    }
    select (gender) {
    this.setState({gender:gender})};

    render() {
        console.log(this.props.secondState)
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="App">
                <div className="header">Signup
                    <progress value="60" max="100" />
                </div>
                <div className="dateOfBirth">
                    <Subheader>DATE OF BIRTH</Subheader>
                         <input type="text" placeholder="DD" value={this.state.date.day}   onChange  ={this.setDay.bind(this)}/>
                         <input type="text" placeholder="MM" value={this.state.date.mounth}   onChange ={this.setMounth.bind(this)} />
                         <input type="text" placeholder="YYYY" value={this.state.date.year}  onChange ={this.setYear.bind(this)} />
                                          <h4 id="datestatus"></h4>
                    <Subheader>GENDER</Subheader>
                         <ButtonGroup>
                             <Button   onClick={this.select.bind(this,"MALE")} active id="btn-gender" >MALE</Button>
                             <Button   onClick={this.select.bind(this,"FEMALE")}id="btn-gender">FEMALE</Button>
                             <Button    onClick={this.select.bind(this,"UNSPECIFIED")} id="btn-gender">UNSPECIFIED</Button>
                         </ButtonGroup>
                                 <br />
                    <Subheader >Where Did You Hear About  Us</Subheader>
                                <DropDownMenu value={this.state.indexOfMenu} onChange={this.hearAboutUs.bind(this)}>
                                    <MenuItem  value={0} primaryText="Choose" />
                                    <MenuItem  value={1} primaryText="From Internet " />
                                    <MenuItem  value={2} primaryText="From Friends " />
                                    <MenuItem  value={3} primaryText="Other" />
                                </DropDownMenu>
                                <Divider/>

                 <div className="prev">

                </div>

                <div className="nextAndPrev">
                    <FlatButton
                        label="Prev"
                        onClick = {this.prev.bind(this)}
                        style = {Leftstyle}
                    ></FlatButton>
                    <FlatButton
                        style = {RightStyle}
                        label="Next"
                        labelPosition="before"
                        primary={true}
                        onClick={this.finish.bind(this)}
                        icon = {<LeftIcon/>}
                    ></FlatButton>
                </div>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({secondState:state});

export default connect(
    mapStateToProps,
    dispatch =>({
        addDateAndGender:(date,gender,about)=>{dispatch({type:"dateAndGender", date:date,gender:gender,hearAboutUs:about})}
    }))(dateOfBirth);