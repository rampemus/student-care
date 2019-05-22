import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from 'react-redux'
import personnel from './components/personnel.json'

const initState = {
    //lame-user-autentification TODO:Server authentication
    userName: personnel[0].firstNames.split(' ')[0] + ' ' + personnel[0].familyName,
    userId: personnel[0].id,
    student: true,//'personnel[0].isStudent == 1 ? true : false',
    teacher: true, //personnel[0].isTeacher == 1 ? true : false,
    administrator: true, //personnel[0].isAdmin == 1 ? true : false,
    courseName: '0001'
}

const userReducer = ( state = initState, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                userName: action.name,
            }
            break
    }
    return state
}

const contentReducer = ( state = initState , action ) => {
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
            break;
        case 'TOGGLE_TEACHER':
            state = {
                ...state,
                teacher: !state.teacher,
            }
            break;
        case 'TOGGLE_ADMIN':
            state = {
                ...state,
                administrator: !state.administrator,
            }
            break;
        default:
            state = {
                ...state,
            }
            break
    }
    return state;
}

const rootReducer = combineReducers({
    userReducer,
    contentReducer
})

const store = createStore(contentReducer);
store.subscribe(()=>{});

ReactDOM.render(
    <Provider store ={store}><App /></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
