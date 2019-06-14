import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore } from "redux"
import { Provider } from 'react-redux'
import personnel from './components/personnel.json'
import courseStudents from './components/coursestudents.json'
import courseTeachers from './components/courseteachers.json'

const initState = {
    //lame-user-autentification TODO:Server authentication
    userName: personnel[0].firstNames.split(' ')[0] + ' ' + personnel[0].familyName,
    userId: personnel[0].id,
    student: true,//'personnel[0].isStudent == 1 ? true : false',
    teacher: true, //personnel[0].isTeacher == 1 ? true : false,
    administrator: true, //personnel[0].isAdmin == 1 ? true : false,
    courseName: '0001',

    //data that user can change is stored here:
    studies: courseStudents,
    teaching: courseTeachers,

}

const rootReducer = ( state = initState , action ) => {
    //content
    switch (action.type) {
        case 'SHOW_HOME':
             state = {
                 ...state,
                 content: 'home',
             }
             break
        //TODO:course page updates
        case 'SHOW_COURSE':
            state = {
                ...state,
                content: 'course',
                courseName: action.courseName,
            }
            break
        case 'SHOW_COURSES':
            state = {
                ...state,
                content: 'courses',
            }
            break
        case 'SHOW_CREDITS':
            state = {
                ...state,
                content: 'credits',
            }
            break
        case 'SHOW_TEACH_AND_GRADE':
            state = {
                ...state,
                content: 'teach',
            }
            break
        case 'SHOW_REGISTRY':
            state = {
                ...state,
                content: 'registry',
            }
            break
        case 'SIGNED_OUT':
            state = {
                ...state,
                content: 'farewell',
            }
            break;
        //and for preview purpose:
        case 'TOGGLE_STUDENT':
            state = {
                ...state,
                student: !state.student,
            }
            if ( !state.student && ( state.content == 'courses' || state.content == 'credits') ) {
                state.content = 'home'
            }
            break;
        case 'TOGGLE_TEACHER':
            state = {
                ...state,
                teacher: !state.teacher,
            }
            if ( !state.teacher && state.content == 'teach' ) {
                state.content = 'home'
            }
            break;
        case 'TOGGLE_ADMIN':
            state = {
                ...state,
                administrator: !state.administrator,
            }
            break

            //user
        case "ADD_STUDIES":
            let newStudies = state.studies
            // console.log('Add studies: ' + action.courseName)

            if ( !newStudies.find((course)=>{
                return course.instanceId.includes(action.courseName)
            })) {
                newStudies.push({
                    "instanceId": action.courseName + '_2019',
                    "studentId": "1004"
                })
            }

            state = {
                ...state,
                studies: newStudies,
            }
            break
        case "ADD_TEACHING":
            let newTeaching = state.teaching
            console.log(newTeaching)

            if ( !newTeaching.find((course)=>{
                return course.instanceId.includes(action.courseName)
            })) {
                newTeaching.push({
                    "instanceId": action.courseName + '_2019',
                    "studentId": "1004"
                })
            }
            state = {
                ...state,
                teaching: newTeaching,
            }
            break
    }

    return state;
}

const store = createStore(rootReducer);
store.subscribe(()=>{});

ReactDOM.render(
    <Provider store ={store}><App /></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
