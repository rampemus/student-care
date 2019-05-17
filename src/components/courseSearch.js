import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from 'react-autocomplete';
import {Row, Col, Container, Button,ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import courses from './courses.json';
import CourseView from './courseView.js';

class CourseSearch extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      maxNameLength: '80',
    }

    // this.handleItemSelect = (courseCode) => props.handleItemSelect;
    // this.handleItemSelect = this.hadleItemSelect.bind(this);
    // this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemSelect = props.handleItemSelect.bind(this);

  }

  render() {
    return (
      <Autocomplete
        wrapperStyle={{
            // display: 'block',
        }}

        menuStyle={{
          borderRadius: '0px 0px 10px 10px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.98)',
          padding: '0px 0px 0px 0px',
          fontSize: '100%',
          position: 'fixed',
          overflow: 'auto',
          textOverflow: 'clip',
          maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
          width: '30%',
        }}

        renderInput={(props)=>
            <input {...props} placeholder={'Kurssihaku...'}
                style={{ width:'100%'}}
            />}

        //TODO: make async query to a real server
        items={courses}

        shouldItemRender={
            (item, value) =>
            item.shortName.concat(': ' + item.name).toLowerCase().indexOf(value.toLowerCase()) > -1
        }

        getItemValue={ item => item.shortName + ': ' + item.name }

        renderItem={(item, highlighted) =>
            <Row style={{ textAlign: 'left'}}>
                <Col>
                    <ButtonToolbar>
                        <Button variant="link"
                            key={item.shortName.toString()}
                            style={{textAlign: 'left'}}
                            >
                            {item.shortName + ': '}
                            {item.name.length > this.state.maxNameLength ?
                                 item.name.substring(0,this.state.maxNameLength -2) + '...'
                                 : item.name}

                        </Button>
                    </ButtonToolbar>
                </Col>
                <Col xs={4}>
                    <ButtonToolbar
                            style={{
                                marginTop: '6px', //buttons align with link
                            }}
                        >
                        <Button variant="outline-success" size="sm" disabled>Ilmottaudu</Button>
                        <Button variant="outline-info" size="sm" disabled>Opeta</Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        }
        value={this.state.value}
        onChange={
            e => this.setState({ value: e.target.value })
        }
        onSelect={
            value => {
                this.setState({value});
                this.props.goToSelectedCourse(value.substring(0,8));
            }
        }
      />
    )
  }
};

const mapStateToProps = (state) => {
    return {
        //
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToSelectedCourse: (courseCode) => {
            dispatch({
                type:'SHOW_COURSE',
                courseName: courseCode,
            })
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CourseSearch);
