import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap'
import { connect } from 'react-redux'
import courseInstances from './courseinstances.json'
import courseGrades from './coursegrades.json'

class MyCredits extends React.Component {

    constructor (props) {
        super(props)

        let courseObjects = []

        for ( let i = 0; i < courseGrades.length; i++) {
            //instead of 1019 we should use prop.user
            //but this is just hard coded to enable
            //the preview
            if (courseGrades[i].studentId == '1019' && courseGrades[i].adminId != '0') {
                courseObjects.push(courseGrades[i])

            }
        }

        this.state = {
            courses: courseObjects,
        }
    }

    render() {
        return (
            <Container>
                <h2>Minun suoritukset</h2>
                <p>Alla on listattu kurssit, joihin olen saanut suoritusmerkinnän:</p>
                {this.state.courses.map(courses => {
                    return(
                        <p>{courses.instanceId} kurssin nimi, arvosana: {courses.grade}, päiväys: {courses.adminDate}</p>
                    );
                })}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(MyCredits);
