import React, { Component } from 'react'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import personnel from './personnel.json'
import {Button} from 'react-bootstrap'

export default class PersonnelCard extends React.Component {
    constructor (props) {
        super(props)

    };

    render(){
        const person = personnel.find(x => x.id === this.props.studentId)
        return(
            <OverlayTrigger trigger="focus" placement="right" overlay={(
              <Popover id="popover-basic" title={
                  person.firstNames.split(' ')[0] + ' ' + person.familyName + ' '
              }>
                <p style={{textAlign:'center'}}>kuva</p>
                <p><a href={"mailto:" + person.username + "@utu.fi"}>{person.username + "@utu.fi"}</a></p>
              </Popover>
            )}>
                <Button variant="link" style={{padding:'0px', margin:'0px'}}>{this.props.studentId}</Button>
            </OverlayTrigger>
        )
    }
}
