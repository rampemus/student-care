import React, { Component } from 'react';
import {Row, Col, DropdownButton, ButtonGroup, Dropdown, FormControl, Form, Button, Navbar, Nav, Container} from 'react-bootstrap';
import { createStore } from 'redux';
import CourseSearch from './components/courseSearch.js';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() {
    return (
    <div className="App">
    <Navbar bg='light'  sticky="top">
      <Col><Navbar.Brand href="home">Student-Care</Navbar.Brand></Col>
      <Col xs={6}>
          {/* <Form >
              <FormControl type="text" placeholder="Hae kursseja..." className="mr-sm-2" />
          </Form> */}
          <CourseSearch/>
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
    <Row>
        <Col  xs={3} className="d-flex align-items-end flex-column">

            <Nav defaultActiveKey="/home"
                variant="pills"
                bg='dark'
                className="d-flex align-items-start flex-column"
                size="sm">

                <Nav.Link href="/home" >Omat kurssit</Nav.Link>
                <Nav.Link eventKey="credits">Opintosuoritukset</Nav.Link>
                <Nav.Link eventKey="assesment" disabled>Opetus ja arviointi</Nav.Link>
                <Nav.Link eventKey="registry" disabled>Opintorekisteri</Nav.Link>
                <Nav.Link eventKey="signout" variant="link">Kirjaudu ulos</Nav.Link>
            </Nav>

        </Col>

        <Col>
            <div id='content-root'>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >Learn React</a>
                <DBPreview/>
            </div>
        </Col>
    </Row>

    </div>

    );
  }
}

class DBPreview extends Component {
    render() {

        const db = openDatabase('value4life', '3.10', 'Test DB', 2 * 1024 * 1024);

        let msg = 'no result from database';

        db.transaction(
            function (tx) {
                msg = 'transaction started';
                tx.executeSql('SELECT * FROM personnel', [],
                    function (tx, results) {
                          var len = results.rows.length, i;
                          msg = "<p>Found rows: " + len + "</p>";
                          document.querySelector('#status').innerHTML +=  msg;

                          for (i = 0; i < len; i++) {
                             alert(results.rows.item(i).log );
                          }
                    }, null);
                }
            );

        // on commandline: yarn add express mysql cors
        // const sqlite3 = require('sqlite3').verbose();

        // let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => {
        //     if (err) {
        //         console.error(err.message);
        //     }
        //     console.log('Connected to the chinook database.');
        // });
        // var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);

        return <div>
                <p>Database preview will be rendered here:</p>
                {msg}
            </div>
    }
}
