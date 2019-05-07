import React, { Component } from 'react';
import {Row, Col, DropdownButton, ButtonGroup, Dropdown, Item, FormControl, Form, Button, Navbar} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() {
    return (
    <div className="App">
    <Navbar bg='light'>
      <Col><Navbar.Brand href="#home">Student-Care</Navbar.Brand></Col>
      <Col xs={6}>
          <Form >
              <FormControl type="text" placeholder="Hae kursseja..." className="mr-sm-2" />
          </Form>
      </Col>
      <Col>
      <DropdownButton as={ButtonGroup} title="Opiskelija" id="bg-vertical-dropdown-1">
              <Dropdown.Item eventKey="1">Opiskelija</Dropdown.Item>
              <Dropdown.Item eventKey="2">Opettaja</Dropdown.Item>
              <Dropdown.Item eventKey="3">Hallinto</Dropdown.Item>
          </DropdownButton>
      </Col>
    </Navbar>
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              <DBPreview/>
          </header>
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
