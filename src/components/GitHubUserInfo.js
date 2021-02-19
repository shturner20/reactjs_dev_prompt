import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class GitHubUserInfo extends React.Component
{

    
   
    render(){
        const user = this.props.user;

        if(user === null)
            return null;

        const repoUrl = "https://github.com/" + user.login + "?tab=repositories";


      
        


        return (
                <div className="Profile">
                    <Row> 
                        <Col> 
                            <h2> {user.login}</h2>
                        </Col>
                    </Row>
                    <Row> 
                        <Col> 
                           <img src={user.avatar_url} alt="Profile Pic" />
                           <p>Email: {user.email !== null ? user.email: 'Unavaliable'}</p>
                           <p>Location:  {user.location} </p>
                           <p>Real Name:  {user.name} </p>
                           <p>Public Repos:  <a target="_blank" href={repoUrl}> {user.public_repos} </a> </p>
                           <p>Account Created:  { new Date(Date.parse(user.created_at)).toLocaleDateString()}  </p>
                           <p>Last Updated: { new Date(Date.parse(user.updated_at)).toLocaleDateString()} </p>
                        </Col>
                        <Col>
                           
                        </Col>
                    </Row>                  
                </div>
        )
    }
}