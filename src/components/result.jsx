import React,{Component } from 'react';
import {connect} from "react-redux";

 class Result extends Component{
    render(){
        return(
            <div>
                <h2>Email:</h2>{this.props.FinishState.email}
                <h2>Password:</h2>{this.props.FinishState.password}
                <h2>Gender: </h2>{this.props.FinishState.gender}
                <h2>Date Of Birth :</h2>{this.props.FinishState.date.day}/{this.props.FinishState.date.mounth}/{this.props.FinishState.date.year}
                <h2>Where Did you hear about us :</h2>{this.props.FinishState.hearAboutUs}


            </div>
        )
    }
}

const mapStateToProps = state => ({FinishState:state});
export default connect(
    mapStateToProps,
    dispatch =>({
    }))(Result);