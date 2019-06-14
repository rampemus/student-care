import React, { Component } from 'react'
import {Row, Col, DropdownButton, ButtonGroup, Dropdown, Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import courseInstances from './components/courseinstances.json'
import CourseInstance from './components/courseInstance.js'
import PersonnelCard from './components/personnelCard.js'
import CourseSearch from './components/courseSearch.js'
import MyCourses from './components/myCourses.js'
import MyTeaching from './components/myTeaching.js'
import MyCredits from './components/myCredits.js'
import Registry from './components/registry.js'
import logo from './logo.svg';
import './App.css';

//mongoimport --host studentcare-shard-0/studentcare-shard-00-00-snos7.azure.mongodb.net:27017,studentcare-shard-00-01-snos7.azure.mongodb.net:27017,studentcare-shard-00-02-snos7.azure.mongodb.net:27017 --ssl --username rampemus --password <PASSWORD> --authenticationDatabase admin --db <DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>

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
                <DropdownButton as={ButtonGroup}
                    title="Asetukset"
                    id="bg-vertical-dropdown-1"
                    variant="outline-secondary"
                //access properties would never be accessed from here
                //but just for previewing options we have these here:
                    onSelect={eventKey => {
                        switch (eventKey) {
                            case 'student': this.props.toggleStudent()
                            break
                            case 'teacher': this.props.toggleTeacher()
                            break
                            case 'admin': this.props.toggleAdmin()
                            break
                        }
                    }}
                >
                  <Dropdown.Item eventKey="student"
                      style={this.props.studentAccess ? {color:'green'} : {
                          color:'red',
                  }}>
                    Opiskelija</Dropdown.Item>
                  <Dropdown.Item eventKey="teacher"
                      style={this.props.teacherAccess ? {color:'green'} : {
                      color:'red',
                  }}>
                    Opettaja</Dropdown.Item>
                  <Dropdown.Item eventKey="admin"
                      style={this.props.adminAccess ? {color:'green'} : {color:'red'}}>
                    Hallinto</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4" disabled>Slowmode</Dropdown.Item>
              </DropdownButton>

          </Col>
        </Navbar>
        <Row style={{marginTop:'20px', marginBottom:'20px'}}>
            <Col  xs={3} className="d-flex align-items-end flex-column">

                <Nav defaultActiveKey="/home"
                    variant="pills"
                    bg='dark'
                    className="d-flex align-items-start flex-column"
                    size="sm"

                    onSelect={selectedKey => {
                        switch (selectedKey) {
                            case "courses": this.props.goMyCourses(); break;
                            case "credits": this.props.goCredits(); break;
                            case "assesment": this.props.goTeachGrades(); break;
                            case "registry": this.props.goRegistry(); break;
                            case "signout": this.props.signOut(); break;
                        };
                    }}>

                    <Nav.Link eventKey="courses" disabled={!this.props.studentAccess}>Omat kurssit</Nav.Link>
                    <Nav.Link eventKey="credits" disabled={!this.props.studentAccess}>Opintosuoritukset</Nav.Link>
                    <Nav.Link eventKey="assesment" disabled={!this.props.teacherAccess}>Opetus ja arviointi</Nav.Link>
                    <Nav.Link eventKey="registry" disabled={!this.props.adminAccess}>Opintorekisteri</Nav.Link>
                    <Nav.Link eventKey="signout" variant="link">Kirjaudu ulos</Nav.Link>
                </Nav>

            </Col>

            <Col style={{marginRight:'50px'}}>{    mapStateToContent(this.props.content,this.props.courseName) }</Col>
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
                {this.props.user} (<PersonnelCard studentId={this.props.userId} placement='top'/>)
            </Col>
            <Col style={{textAlign: 'right'}}>{datetime}</Col>
        </Navbar>
        </div>

        );
    }

    componentDidMount() {
        this.props.goHome();
    }
}

const mapStateToContent = (stateName, courseCode) => {
    switch( stateName ) {
            case 'home': return 'homeview'
            case 'course': return <CourseInstance courseId={courseCode}/>
            case 'courses' : return <MyCourses />
            case 'credits' : return <MyCredits />
            case 'teach' : return <MyTeaching />
            case 'registry' : return <Registry />
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
        //and for previewing we have these
        toggleStudent: () => {
            dispatch({
                type: 'TOGGLE_STUDENT',
            });
        },
        toggleTeacher: () => {
            dispatch({
                type: 'TOGGLE_TEACHER',
            });
        },
        toggleAdmin: () => {
            dispatch({
                type: 'TOGGLE_ADMIN',
            });
        },
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

export default connect(mapStateToProps,mapDispatchToProps)(App);
