import React from 'react';
import courseInstances from './courseinstances.json';
import courses from './courses.json'

export default class CourseView extends React.Component {

    constructor (props) {
        super(props)

        //TODO: make it a server that will find instances and send it via json
        let instances = [];
        for (let i = 0; i < courseInstances.length; i++) {
            let courseCode = courseInstances[i].courseId;
            // console.log(courseInstances[i].instanceid + ' found!!!');
            if ( courseCode.toLowerCase().includes(props.shortName.toLowerCase() ) ) {
                instances.push(courseInstances[i]);
                console.log( '(' + i + ')' + courseInstances[i].instanceid + ' added!!!');
            }
        }

        //TODO: make it task for the server to deliver right course name also
        let courseName = 'noname';
        for ( let i = 0; i < courses.length; i++) {
            let course = courses[i];
            if ( course.shortName == props.shortName) {
                courseName = course.name;
            }
        }

        this.state = {
            instanceList: instances,
            shortName: props.shortName,
            name: courseName,
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.shortName}: {this.state.name}</h1>
                <p>Kurssi-info!</p>
                <p>Tästä alkaa info</p>
            </div>
        )
    }

}
