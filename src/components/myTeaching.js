import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap'
import { connect } from 'react-redux'
import courseInstances from './courseinstances.json'
import courseTeachers from './courseteachers.json'

class MyTeaching extends React.Component {

    constructor (props) {
        super(props)

        let courseObjects = []

        for ( let i = 0; i < courseTeachers.length; i++) {
            if (courseTeachers[i].teacherId == props.user) {
                courseObjects.push(courseTeachers[i])
            }
        }

        this.state = {
            courses: courseObjects,
        }
    }

    render() {
        return (
            <Container>
                <h2>Minun pitämät kurssini</h2>
                {this.state.courses.map(courses => {
                    return(
                        <div>
                            <h3>{courses.instanceId}: Kurssinimi</h3>
                            <p>Listaus oppilaista</p>
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
                type:'ACCEPT_CREDITS',
            });
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyTeaching);
