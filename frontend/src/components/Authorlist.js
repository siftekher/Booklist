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

class Authorlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isLoading: false,
       data : [],
       datafromApi: []
    }
  }

  componentDidMount() {
        fetch("http://localhost:3300/authors")
            .then(res => res.json())
            .then(data => {
                let dataFromApi = data.author.map(author => {
                    return {
                        id: author._id,
                        first_name: author.first_name,
                        last_name: author.last_name
                    }
                })

                this.setState({
                    datafromApi: dataFromApi
                });
                
                var dataTable = {
                columns: [
                  {
                    label: 'First Name',
                    field: 'first_name',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'Last Name',
                    field: 'last_name',
                    sort: 'asc',
                    width: 100
                  }
                ],
                
                rows: [...this.state.datafromApi.map((author, i) => (
                        {
                            id: author.id,
                            first_name: author.first_name,
                            last_name: author.last_name,
                            clickEvent: () => this.showEdit(author.id)
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
    window.location.href = "/AuthorsEdit/" + id;
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
            <h2 className="text-center">Authors List</h2>
          </Col>
          <Col md={8} className="ml-auto mr-auto">
             <Link to='/Authorsadd'>
                 <Button color="primary" >Add Author</Button>&nbsp;
             </Link>
             <Link to='/'>
                 <Button color="primary" >Back</Button>
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
 
Authorlist.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(HomeStyles)(Authorlist);


