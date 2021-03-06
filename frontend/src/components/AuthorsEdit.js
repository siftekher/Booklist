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
import Config from '../config/config';
const axios = require('axios').default;

class AuthorsEdit extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          author_id: '',
          first_name: '',
          last_name: '',
          author_list: []
      };
      this.handleChange = this.handleChange.bind(this);
      
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
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
  
    validateForm() {
        var valid = true;
        if (this.state.first_name === "") {
          this.setState({ first_nameState: "has-danger" });
          valid = false;
        }
        if (this.state.last_name === "") {
          this.setState({ last_nameState: "has-danger" });
          valid = false;
        }

        return valid;
    }

  async handleSubmit(event) {
    if(this.validateForm()) {
        const {
            author_id,
            first_name,
            last_name
        } = this.state;
        await this.updateAuthor({
           author_id: author_id,
           first_name: first_name,
           last_name: last_name
        });
    }
  }
  
  async updateAuthor(authorDetails) {

    axios({
      method: 'put',
      url: Config.API_URL + '/author/'+authorDetails.author_id,
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

  componentDidMount() {
    if (this.props.match.params.id) {
        fetch(Config.API_URL + "/authors/"+this.props.match.params.id)
            .then(res => res.json())
            .then(data => {
                console.log(data.author);
                this.setState({
                    isLoading: true,
                    author_id: data.author._id,
                    first_name: data.author.first_name,
                    last_name: data.author.last_name
                });

            })
            .catch(error => {
                console.log(error);
            });
    }
  }
  
  render() {

  return (
  <>
        <div className="content">
          <Col md={8} className="ml-auto mr-auto">
            <h2 className="text-center">Update Author</h2>
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
                          value={this.state.first_name || ""}
                          onChange={e => this.change(e, "first_name", "length", 3)}
                        />
                        {this.state.first_nameState === "has-danger" ? (
                           <label className="error">This field is required.</label>
                        ) : null}
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
                          value={this.state.last_name || ""}
                          onChange={e => this.change(e, "last_name", "length", 3)}
                        />
                        {this.state.last_nameState === "has-danger" ? (
                           <label className="error">This field is required.</label>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 12, offset: 2 }}>
                        <Button color="primary" onClick={() => this.handleSubmit()} >Update</Button> &nbsp;
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
 
export default withRouter(AuthorsEdit);
