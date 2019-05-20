import React, { Component } from 'react';
import {Row, Col, DropdownButton, ButtonGroup, Dropdown, FormControl, Form, Button, Navbar, Nav, Container} from 'react-bootstrap';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import CourseSearch from './components/courseSearch.js';
import CourseInstance from './components/courseInstance.js';
import logo from './logo.svg';
import './App.css';

const currentdate = new Date();
const datetime = "Kirjautunut " + currentdate.getDate() + "."
                + (currentdate.getMonth()+1)  + "."
                + currentdate.getFullYear() + " klo "
                + currentdate.getHours() + "."
                + currentdate.getMinutes()

class App extends Component {

    render() {
        return (
        <div className="App">
        <Navbar bg='light' sticky='top'>
          <Col onClick={() => {this.props.goHome()}}><Navbar.Brand> Student-Care</Navbar.Brand></Col>
          <Col xs={6}>
              {/* <Form >
                  <FormControl type="text" placeholder="Hae kursseja..." className="mr-sm-2" />
              </Form> */}
              <CourseSearch
                  handleItemSelect={(courseCode)=>{
                      this.props.goToSelectedCourse(courseCode)
                      console.log(courseCode)
                  }}
              />
          </Col>
          <Col>
              <DropdownButton as={ButtonGroup} title="Asetukset" id="bg-vertical-dropdown-1" variant="outline-secondary">
                  <Dropdown.Item eventKey="1"  variant="success">Opiskelija</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Opettaja</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Hallinto</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4" disabled>Slowmode</Dropdown.Item>
              </DropdownButton>

          </Col>
        </Navbar>
        <Row style={{marginTop:'20px'}}>
            <Col  xs={3} className="d-flex align-items-end flex-column">

                <Nav defaultActiveKey="/home"
                    variant="pills"
                    bg='dark'
                    className="d-flex align-items-start flex-column"
                    size="sm"
                    onSelect={selectedKey => {
                        switch (selectedKey) {
                            case "home": this.props.goMyCourses(); break;
                            case "credits": this.props.goCredits(); break;
                            case "assesment": this.props.goTeachGrades(); break;
                            case "registry": this.props.goRegistry(); break;
                            case "signout": this.props.signOut(); break;
                        };
                    }}>

                    <Nav.Link eventKey="home" disabled={!this.props.studentAccess}>Omat kurssit</Nav.Link>
                    <Nav.Link eventKey="credits" disabled={!this.props.studentAccess}>Opintosuoritukset</Nav.Link>
                    <Nav.Link eventKey="assesment" disabled={!this.props.teacherAccess}>Opetus ja arviointi</Nav.Link>
                    <Nav.Link eventKey="registry" disabled={!this.props.adminAccess}>Opintorekisteri</Nav.Link>
                    <Nav.Link eventKey="signout" variant="link">Kirjaudu ulos</Nav.Link>
                </Nav>

            </Col>

            <Col>{    mapStateToContent(this.props.content,this.props.courseName) }</Col>
        </Row>
        <Navbar
            fixed="bottom"

            bg='light'
            style={{
                padding: '0px',
            }}
            className='text-muted'
        >
            <Col>Student-Care korporaatio 2019</Col>
            <Col style={{textAlign: 'center'}}>
                {this.props.user} ({this.props.userId})
            </Col>
            <Col style={{textAlign: 'right'}}>{datetime}</Col>
        </Navbar>
        </div>

        );
    }

    componentDidMount() {
        console.log('component mounted');
        this.props.goHome();
    }
}

const mapStateToContent = (stateName, courseCode) => {
    switch( stateName ) {
            case 'home': return 'homeview'
            case 'course': return <CourseInstance courseId={courseCode} />
            case 'courses' : return 'course list'
            case 'credits' : return 'course list of succeeded courses'
            case 'teach' : return 'my courses to teach'
            case 'registry' : return 'admin page'
        }
    return 'none'
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
};

const mapDispatchToProps = (dispatch) => {
    return {
        goHome: () => {
            dispatch({
                type:'SHOW_HOME',
            });
        },
        goToSelectedCourse: () => {
            dispatch({
                type:'SHOW_COURSE',
                // courseName: courseCode,
            })
        },
        goMyCourses: () => {
            dispatch({
                type:'SHOW_COURSES',
            });
        },
        goCredits: () => {
            dispatch({
                type:'SHOW_CREDITS',
            });
        },
        goTeachGrades: () => {
            dispatch({
                type:'SHOW_TEACH_AND_GRADE',
            });
        },
        goRegistry: () => {
            dispatch({
                type:'SHOW_REGISTRY',
            });
        },
        signOut: () => {
            dispatch({
                type:'SIGNED_OUT',
            });
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
