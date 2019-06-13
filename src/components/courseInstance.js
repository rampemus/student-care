import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import courseInstances from './courseinstances.json';
import CourseView from './courseView.js';

class CourseSearch extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        // this.handleItemSelect = (courseCode) => props.handleItemSelect;
        // this.handleItemSelect = this.hadleItemSelect.bind(this);
        // this.handleItemClick = this.handleItemClick.bind(this);

        console.log(this.props.courseId)
        let courseObjects = []
        //take last courseInstance that matches with the course id
        for (let i = 0; i < courseInstances.length; i++ ) {
            if ( courseInstances[i].courseId == this.props.courseId ) {
                courseObjects.push(courseInstances[i]);
            }
        }
        console.log(courseObjects)

        return (
            <div>
                <h2>{this.props.courseId}</h2>
                {courseObjects.reverse().map(courseObjects => {
                    if ( courseObjects.instanceid.indexOf('2019') != -1 ) {
                    return (
                        <div>
                            <h3>
                                {courseObjects.instanceid}
                                <ButtonToolbar
                                        style={{
                                            marginTop: '6px', //buttons align with link

                                            //you will be able to sign in for the course if its instance is in year 2019
                                            //we are missing signable course table in the data
                                        }}>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={()=>{this.props.signToSelectedCourse(this.props.courseId)}}
                                    >Ilmottaudu</Button>
                                    <Button
                                        variant="outline-info"
                                        size="sm"
                                        onClick={()=>{this.props.teachSelectedCourse(this.props.courseId)}}
                                    >Opeta</Button>
                                </ButtonToolbar>
                            </h3>
                            <p>{courseObjects.gradingRule}</p>
                        </div>
                    )} else {
                    return(
                        <div>
                            <h3>
                                {courseObjects.instanceid}
                            </h3>
                            <p>{courseObjects.gradingRule}</p>
                        </div>
                    )}
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        content: state.content,
        courseName: state.courseName,
        user: state.userName,
        userId: state.userId,
        studentAccess: state.student,
        teacherAccess: state.teacher,
        adminAccess: state.administrator,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signToSelectedCourse: (courseInstance) => {
            dispatch({
                type:'ADD_STUDIES',
                courseName: courseInstance,
            })
        },
        teachSelectedCourse: (courseInstance) => {
            dispatch({
                type:'ADD_TEACHING',
                courseName: courseInstance,
            })
        },
    };
};

const courseInstance = (courseId) => {

}

export default connect(mapStateToProps,mapDispatchToProps)(CourseSearch);
