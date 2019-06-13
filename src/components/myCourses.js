import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap'
import { connect } from 'react-redux'
import courseInstances from './courseinstances.json'
import courseStudents from './coursestudents.json'

class MyCourses extends React.Component {

    constructor (props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <h2>Minun kurssit</h2>
                <p>Alla on listattu kurssit, joihin on ilmottauduttu:</p>
                {this.props.courses.filter( courses => {
                        return courses.studentId == this.props.user
                    }).map(courses => {
                        return(
                            <div>
                                <p>{courses.instanceId} kurssin nimi</p>
                            </div>
                        )
                    })}
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userId,
        courses: state.studies,
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
