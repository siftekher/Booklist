import React from 'react';
import PropTypes from "prop-types";
import { MDBDataTable } from 'mdbreact';
import withStyles from "@material-ui/core/styles/withStyles.js";
import {
  Col,
  Button,
  Row,Card,
  CardBody
} from "reactstrap";
import { Link } from "react-router-dom";

const HomeStyles = {
  textalignright: {
    textAlign: 'right',
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isLoading: false,
       data : [],
       datafromApi: []
    }
  }

  componentDidMount() {
        fetch("http://localhost:3300/books")
            .then(res => res.json())
            .then(data => {
                let dataFromApi = data.book.map(book => {
                    var authorName = '';
                    if(book.author != undefined){
                        authorName = book.author.first_name+' '+ book.author.last_name ;
                    }
                    return {
                        id: book._id,
                        Name: book.name,
                        ISBN: book.isbn,
                        author: authorName
                    }
                })

                this.setState({
                    datafromApi: dataFromApi
                });
                
                var dataTable = {
                columns: [
                  {
                    label: 'Name',
                    field: 'Name',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'ISBN',
                    field: 'ISBN',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: 'Author',
                    field: 'author',
                    sort: 'asc',
                    width: 100
                  }
                ],
                
            rows: [...this.state.datafromApi.map((book, i) => (
                        {
                            id: book.id,
                            Name: book.Name,
                            ISBN: book.ISBN,
                            author: book.author,
                            clickEvent: () => this.showEdit(book.id)
                        }
                    ))]

                }
                
                this.setState({
                    data: dataTable,
                    isLoading: true
                });

            })
            .catch(error => {
                console.log(error);
            });
  }
  
  showEdit(id) {
    window.location.href = "/BooksEdit/" + id;
  
  }
  
  render() {
    const isLoading = this.state.isLoading;
    if (!isLoading) {
      return null;
    }

    return (
      <>
        <div className="content">
          <Col md={8} className="ml-auto mr-auto">
            <h2 className="text-center">Book List</h2>
          </Col>
          <Col md={8} className="ml-auto mr-auto">
             <Link to='/Books'>
                <Button color="primary" >Add New Book</Button>&nbsp;
             </Link>
             <Link to='/Authors'>
                <Button color="primary" >Author List</Button>
             </Link>
          </Col>
          <Row className="mt-5">
            <Col xs={12}>
              <Card>
                <CardBody>
                   <MDBDataTable 
                      bordered 
                      hover 
                      data={this.state.data} 
                      order={['Name', 'asc']}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
              
      </>
    );
  }
}
 
Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(HomeStyles)(Home);


