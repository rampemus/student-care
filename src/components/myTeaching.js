import React from 'react'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import PersonnelCard from './personnelCard.js'
import { connect } from 'react-redux'
import coursesData from './courses.json'
import courseInstances from './courseinstances.json'
import courseStudents from './coursestudents.json'
import courseGrades from './coursegrades.json'

class MyTeaching extends React.Component {
    // 
    // constructor (props) {
    //     super(props)
    //
    // }

    render() {
        let courseObjects = []

        for ( let i = 0; i < this.props.courses.length; i++) {
            if (this.props.courses[i].teacherId == this.props.user) {
                courseObjects.push(this.props.courses[i])
            }
        }

        //welcome to my spaghetti parser
        //TODO:dataserver will implement this better later
        for ( let course of courseObjects) {
            course.students = [] //list of student id's into the course
            course.grades = []
            course.info = coursesData.find(courseData => courseData.shortName == course.courseId)

            // console.log(course)
            for ( let i = 0; i < courseStudents.length; i++) {
                if ( courseStudents[i].instanceId == course.instanceId ) {
                    course.students.push(courseStudents[i].studentId)

                }
            }

            course.exercises = [] //list of exercises for this course
            let def = /DEF/g //finds the start of defenitions in the datastring
            for ( let i = 0; i < courseInstances.length; i++) {
                if ( courseInstances[i].instanceid == course.instanceId) {
                    let match = 0
                    while ( match = def.exec(courseInstances[i].gradingRule))
                    //push all exercises of this courseInstance into single array
                    course.exercises.push(courseInstances[i].gradingRule.substring(match.index+4,courseInstances[i].gradingRule.indexOf(':',match.index)))
                    //result looks like: harjaa[0..6] and there is multiple of these pushes
                }
            }
            // console.log(course)
        }

        return (
            <Container>
                <h2>Minun pitämät kurssini</h2>
                {courseObjects.map(courses => {
                    return(
                        <div>
                            <h3>{courses.instanceId}: {}</h3>
                            <Table responsice hover>
                                <thead>
                                    <tr>
                                        <th>Opiskelija</th>
                                        {courses.exercises.map(exercise => {
                                            return (
                                                <th>{exercise}</th>
                                            );
                                        })}
                                        <th>Arvosana</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.students.map(student => {
                                        return (
                                            <tr>
                                                <td><PersonnelCard studentId={student} placement='right'/></td>
                                                {courses.exercises.map(exercise => {
                                                    return (
                                                        //gonna print some results here that don't exist in the data
                                                        <td>{Math.floor(Math.random()*exercise.substring(exercise.indexOf(']')-1,exercise.indexOf(']')))}</td>
                                                    );
                                                })}
                                                <td>{0}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
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
        courses: state.teaching,
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
