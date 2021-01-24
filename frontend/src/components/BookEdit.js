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
import Select from "react-select";
import { Link } from "react-router-dom";

const axios = require('axios').default;

class BookEdit extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          book_id: '',
          name: '',
          isbn: '',
          author: '',
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
  async handleSubmit(event) {
      //validation goes here
      const {
            book_id,
            name,
            isbn,
            author,
        } = this.state;
      await this.updateBook({
          book_id:book_id,
          name: name,
          isbn: isbn,
          author: author,
      });
  }
  
  async updateBook(bookDetails) {

    axios({
      method: 'put',
      url: 'http://localhost:3300/book/'+bookDetails.book_id,
      data: bookDetails,
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
        console.log(this.props.match.params.id);
        fetch("http://localhost:3300/books/"+this.props.match.params.id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoading: true,
                    book_id: data.book._id,
                    name: data.book.name,
                    isbn: data.book.isbn,
                    author:data.book.author,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
      
      
      
        fetch("http://localhost:3300/authors")
            .then(res => res.json())
            .then(data => {
                console.log(data.author);
                this.setState({
                    isLoading: true,
                    author_list: data.author
                });

            })
            .catch(error => {
                console.log(error);
            });

  }
  
  render() {
    let optionAuthors = this.state.author_list.map(function (author) {
      return { value: author._id, label: author.first_name +' '+ author.last_name};
    });
      
  return (
  <>
        <div className="content">
          <Col md={8} className="ml-auto mr-auto">
            <h2 className="text-center">Update Book</h2>
          </Col>

          <Row className="mt-5">
            <Col xs={10} md={10}>
              <Card>
                <CardBody>

                  <Form>
                    <FormGroup row>
                      <Label for="name" sm={2}>
                        Name
                      </Label>
                      <Col sm={6}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Name"
                          value={this.state.name || ""}
                          onChange={e => this.change(e, "name", "length", 3)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="isbn" sm={2}>
                        ISBN
                      </Label>
                      <Col sm={6}>
                        <Input
                          type="text"
                          name="isbn"
                          id="isbn"
                          placeholder="ISBN"
                          value={this.state.isbn || ""}
                          onChange={e => this.change(e, "isbn", "length", 3)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Author</Label>
                        <Col sm={6}>
                            <Select
                                className="react-select info"
                                classNamePrefix="react-select"
                                name="author"
                                onChange={value =>
                                    this.setState({ author: value.value })
                                }
                                value={optionAuthors.find(op => {
                                     return op.value === this.state.author
                                })}
                                options={optionAuthors}
                                placeholder="Author"
                                isDisabled={!this.state.isLoading}
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
 
export default withRouter(BookEdit);


