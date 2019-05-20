import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap'
import { connect } from 'react-redux'
import courseInstances from './courseinstances.json'
import courseStudents from './coursestudents.json'

class MyCourses extends React.Component {

    constructor (props) {
        super(props)

        let courseObjects = []

        for ( let i = 0; i < courseStudents.length; i++) {
            if (courseStudents[i].studentId == props.user) {
                courseObjects.push(courseStudents[i])

            }
        }

        this.state = {
            courses: courseObjects,
        }
    }

    render() {
        return (
            <Container>
                <h2>Minun kurssit</h2>
                <p>Alla on listattu kurssit, joihin on ilmottauduttu:</p>
                {this.state.courses.map(courses => {
                    return(
                        <div>
                            <p>{courses.instanceId} kurssin nimi</p>
                        </div>

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
    return {
        acceptCredits: () => {
            dispatch({
                type:'REMOVE_ME_FROM_COURSE',
            });
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyCourses);
