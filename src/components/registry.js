import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import courseInstances from './courseinstances.json'
import PersonnelCard from './personnelCard.js'
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
                <Table  responsive hover>
                    <thead>
                        <tr>
                            <th>Suoritettu</th>
                            <th>Kurssikoodi</th>
                            <th>Opiskelija</th>
                            <th>Opettaja</th>
                        </tr>
                    </thead>
                    {this.state.pending.map(pending => {
                        return(
                            <tbody>
                                <tr>
                                    <td>{pending.gradedate}</td>
                                    <td>{pending.instanceId}</td>
                                    <td><PersonnelCard studentId={pending.studentId}/></td>
                                    <td><PersonnelCard studentId={pending.teacherId}/></td>
                                </tr>
                            </tbody>
                        );
                    })}
                </Table>
                <h2>Hyväksytyt merkinnät</h2>
                <Table  responsive hover>
                    <thead>
                        <tr>
                            <th>Suoritettu</th>
                            <th>Kurssikoodi</th>
                            <th>Opiskelija</th>
                            <th>Opettaja</th>
                            <th>Myönnetty</th>
                            <th>Myöntäjä</th>
                        </tr>
                    </thead>
                {this.state.accepted.map(accepted => {
                    return(
                        <tbody>
                            <tr>
                                <td>{accepted.gradedate}</td>
                                <td>{accepted.instanceId}</td>
                                <td><PersonnelCard studentId={accepted.studentId}/></td>
                                <td><PersonnelCard studentId={accepted.teacherId}/></td>
                                <td>{accepted.adminDate}</td>
                                <td><PersonnelCard studentId={accepted.adminId}/></td>
                            </tr>
                        </tbody>
                    );
                })}
                </Table>
            </Container>
        )
    }
}
