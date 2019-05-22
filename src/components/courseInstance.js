import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import courseInstances from './courseinstances.json';
import CourseView from './courseView.js';

export const courseInstance = function(courseId) {

        console.log(courseId)
        let courseObjects = []
        //take last courseInstance that matches with the course id
        for (let i = 0; i < courseInstances.length; i++ ) {
            if ( courseInstances[i].courseId == props.courseId ) {
                courseObjects.push(courseInstances[i]);
            }
        }

        return (
            <div>
                <h2>{courseId}</h2>
                {courseObjects.map(courses => {
                    return(
                        <div>
                            <h3>{courseObjects.instanceid}</h3>
                            <p>{courseObjects.gradingRule}</p>
                        </div>
                    );
                })}
            </div>
        )
}
