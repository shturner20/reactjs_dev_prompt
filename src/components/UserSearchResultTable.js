import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class UserSearchResultTable extends React.Component
{
   
    render(){
        const searchResult = this.props.usersResult;

        if(!searchResult)
            return null;

        let tableRows = [];

         tableRows =  searchResult.map(user =>
                ( <tr key={user.login} scope="row"> 
                    <td>{user.login} </td> 
                    <td><Button variant="dark" onClick={() => this.props.onSelected(user.login)}>View Info</Button> </td> 
                </tr>)
                );
                
        return (
            <Row>
                    <Col>
                        <div className="TableDiv">
                            <Table striped bordered hover className="ResultTable">
                                <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {tableRows}
                                </tbody>  
                            </Table>
                        </div>
                    </Col>
            </Row>
              
        )
    }
}