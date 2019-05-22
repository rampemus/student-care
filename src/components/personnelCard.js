import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import personnel from './personnel.json'
import {Button} from 'react-bootstrap'

export default class PersonnelCard extends React.Component {
    constructor (props) {
        super(props)


    };

    render(){
        /***
            TODO: This query needs to be filtered in the back end!
            So that students will not get all info
            and teachers will not get administrator info
        ***/
        const person = personnel.find(student => student.id === this.props.studentId)
        if (person.username.length < 1) {
            person = personnel.find(student => student.username === this.props.studentId)
        }

        return(
            <OverlayTrigger trigger="focus" placement={this.props.placement} overlay={(
              <Popover id="popover-basic" title={
                  person.firstNames.split(' ')[0] + ' ' + person.familyName + ' '
              }>
                <p><Image src="user.png" style={{textAlign:'center'}} roundedCircle /></p>
                <p style={{textAlign:'center'}}><a href={"mailto:" + person.username + "@utu.fi"}>{person.username + "@utu.fi"}</a></p>
              </Popover>
            )}>
                <Button variant="link" style={{padding:'0px', margin:'0px'}}>{this.props.studentId}</Button>
            </OverlayTrigger>
        )
    }
}
