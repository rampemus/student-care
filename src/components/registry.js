import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap'
import courseInstances from './courseinstances.json'
import courseGrades from './coursegrades.json'

export default class Registry extends React.Component {

    constructor (props) {
        super(props)

        let submissions = [] //pending entries
        let accepted = [] //accepted entries

        for (let i = 0; i < courseGrades.length; i++) {
            if ( courseGrades[i].adminId == 0 ) {
                submissions.push(courseGrades[i])
            } else {
                accepted.push(courseGrades[i])
            }
        }

        this.state = {
            pending: submissions,
            accepted: accepted,
        }
    }

    render() {
        return (
            <Container>
                <h2>Odottavat suoritukset</h2>
                {this.state.pending.map(pending => {
                    return(
                        <p>{pending.gradedate}/{pending.instanceId}/{pending.studentId}, teacher: {pending.teacherId}</p>
                    );
                })}
                <h2>Hyväksytyt merkinnät</h2>
                {this.state.accepted.map(accepted => {
                    return(
                        <p>{accepted.gradedate}/{accepted.instanceId}/{accepted.studentId}, teacher: {accepted.teacherId} | accepted: {accepted.adminDate} by {accepted.adminId}</p>
                    );
                })}
            </Container>
        )
    }
}
