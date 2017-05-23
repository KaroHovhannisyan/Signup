import React, { Component } from 'react';
import '../App.css';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';


class finish extends Component {

    showResult(){
        this.props.history.replace("/result");
    }


    render() {
        console.log('Finish State is ')
        console.log(this.props.finishState)
        return (
            <div className="App">
                <div className="header">Thank you!
                    <progress value="100" max="100" />

                </div>
                <img src="http://gocatchme.henrymike.cz/website/img/icons/done.png" />
                <button className="finishButton" onClick={this.showResult.bind(this)}>Go to Dashboard</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({finishState:state});

export default connect(
    mapStateToProps,
    dispatch =>({
    }))(finish);