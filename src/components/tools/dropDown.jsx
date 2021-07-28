import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './tools_CSS/dropDown.css';

function DropDown(props){
    var num = props.NumberQuestions;
    var dropdownBuilt = [<option value="" selected disabled hidden>Please select</option>]
    for(let i = 1;i<=num;i++){
        dropdownBuilt.push(<option value={i}>{i}</option>);
    }
    return(
        <div className='settingContainer'>
        <Row>
            <Col><label for={props.group} className="inputLabel" id={`${props.group}Lab`}>How many questions from {props.group} would you like to display?</label></Col>
            <Col>
            <select id={props.group+'Drop'} name={props.group+'Drop'} className="inputBox">
                {dropdownBuilt}
            </select>
                </Col>
            </Row>
            </div>
    );
}

export default DropDown;