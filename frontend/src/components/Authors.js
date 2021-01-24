import React from 'react';
import { withRouter } from "react-router-dom";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,Card,
  CardBody
} from "reactstrap";

import { Link } from "react-router-dom";

const axios = require('axios').default;

class Authors extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          first_name: '',
          last_name: ''
      };

  }
  
  async handleSubmit(event) {
      //validation goes here
        const {
            first_name,
            last_name
        } = this.state;
      await this.saveAuthor({
          first_name: first_name,
          last_name: last_name
      });
  }
  
    verifyLength = (value, length) => {
        if (value.length >= length) {
            return true;
        }
        return false;
    };
    // function that verifies if value contains only numbers
    verifyNumber = value => {
        var numberRex = new RegExp("^[0-9]+$");
        if (numberRex.test(value)) {
            return true;
        }
        return false;
    };

    change = (event, stateName, type, stateNameEqualTo, maxValue) => {
        switch (type) {
            case "length":
                if (this.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "has-success" });
                } else {
                    this.setState({ [stateName + "State"]: "has-danger" });
                }

                break;
            case "number":
                if (this.verifyNumber(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "has-success" });
                } else {
                    this.setState({ [stateName + "State"]: "has-danger" });
                }
                break;
            default:
                break;
        }
        this.setState({ [stateName]: event.target.value });
    };
    
  async saveAuthor(authorDetails) {


    axios({
      method: 'post',
      url: 'http://localhost:3300/author',
      data: authorDetails,
      headers: {
      'Content-Type': 'application/json'
      }, 
    }).then( response => {
        if (response.data.message) {
            window.location.href = "/"
        }
    } ).catch( ( error ) => {
      console.log( error );
    } )

  }

  render() {

  return (
  <>
        <div className="content">
          <Col md={8} className="ml-auto mr-auto">
            <h2 className="text-center">Add Author</h2>
          </Col>

          <Row className="mt-5">
            <Col xs={10} md={10}>
              <Card>
                <CardBody>

                  <Form>
                    <FormGroup row>
                      <Label for="first_name" sm={2}>
                        First Name
                      </Label>
                      <Col sm={6}>
                        <Input
                          type="text"
                          name="first_name"
                          id="first_name"
                          placeholder="First Name"
                          onChange={e => this.change(e, "first_name", "length", 3)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="last_name" sm={2}>
                        Last Name
                      </Label>
                      <Col sm={6}>
                        <Input
                          type="text"
                          name="last_name"
                          id="last_name"
                          placeholder="Last Name"
                          onChange={e => this.change(e, "last_name", "length", 3)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 12, offset: 2 }}>
                        <Button color="primary" onClick={() => this.handleSubmit()} >Save</Button> &nbsp;
                        <Link to='/'>
                            <Button color="primary" >Cancel</Button>
                        </Link>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    </>
  );
  }
}
 
export default withRouter(Authors);
