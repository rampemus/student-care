import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import courseInstances from './courseinstances.json';
import CourseView from './courseView.js';

export default class CourseInstance extends React.Component {
    constructor (props) {
        super(props)

        console.log(props.courseId)
        let courseObjects = [] ;
        //take last courseInstance that matches with the course id
        for (let i = 0; i < courseInstances.length; i++ ) {
            if ( courseInstances[i].courseId == props.courseId ) {
                courseObjects.push(courseInstances[i]);
            }
        }

        this.state = {
            courses: courseObjects,
        }
    }

    //TODO: change this into function and use hooks to update courses-array https://stackoverflow.com/questions/37009328/rerender-react-component-when-prop-changes#37009991

    render() {
        return (
            <Container>
                <h1>{this.props.courseId}</h1>
                {this.state.courses.map(courses => {
                    return(
                        <Container>
                        <h2>{courses.instanceid}</h2>
                        <p>{courses.gradingRule}</p>
                        </Container>
                    );
                })}
            </Container>
        )
    }
}
