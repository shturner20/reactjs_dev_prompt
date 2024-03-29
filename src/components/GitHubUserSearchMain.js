import React from 'react'
import {SearchUsers, GetUserInfo} from '../services/GitHubSearchClient'
import GitHubSearchInput from './GitHubSearchInput'
import GitHubUserInfo from './GitHubUserInfo'
import GitHubPagination from './GitHubPagination'
import UserSearchResultTable from './UserSearchResultTable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export default class GitHubUserSearchMain extends React.Component
{
    constructor(props)
    {
        super(props); 
        this.state = { userInput: '',  searchResults: null, user: null, page: 1, totalResultCount: 0};
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectedUser = this.handleSelectedUser.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this); 
    }


    handleChange({target}){
        this.setState({userInput: target.value})
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(prevState.userInput !== this.state.userInput 
        && this.state.userInput !== "")
        {
            this.setState({page : 1})
            this.loadSeachUserResult();
        }
        else if(prevState.userInput !== this.state.userInput && this.state.userInput === "" )
        {
            this.setState({totalResultCount : 0, searchResults: null, user: null})
        }
    }

    async loadSeachUserResult(pageNum)
    {

        const result = await SearchUsers(this.state.userInput, !pageNum ? this.state.page : pageNum)

        if(!result['error'])
        {
            if(result.totalResultCount  > 0)
                this.setState({searchResults: result.data, totalResultCount: result.totalResultCount  })
            else
                this.setState({totalResultCount : 0, searchResults: null, user: null})
        }
        else
        {
            alert("Max Number of searches reached! Please wait 60 seconds to continue search.");
        }
    }

    async handleSelectedUser(username)
    {  

        const result = await GetUserInfo(username)

        if(!result.error)
        {
            this.setState({user: result.data})
        }
        else
        {
            alert("Max Number of searches reached! Please wait 60 seconds to continue search.");
        }   
    }

    handlePageChange(pageNum)
    {
        this.setState({page: pageNum})
        this.loadSeachUserResult(pageNum);
    }

    render() {

        

        return(
            <div>
                <Row>
                    <Col> 
                        <GitHubSearchInput userInput={this.state.userInput} onChange={this.handleChange}/>
                    </Col>
                </Row>
                <Row className="row-margin">
                    <Col>  
                        <h6> Total Found: {this.state.totalResultCount} </h6> 
                    </Col>  
                </Row>
                <Row>
                    <Col xs={3}> 
                       
                        <UserSearchResultTable  usersResult={this.state.searchResults} totalResultCount={this.state.totalResultCount} onSelected={this.handleSelectedUser} />
                        <GitHubPagination  pageNum={this.state.page} totalResultCount={this.state.totalResultCount} onPageChange={this.handlePageChange} /> 
                       
                    </Col>
                    <Col> 
                        <GitHubUserInfo user={this.state.user} />
                    </Col>
                </Row>
            </div>
        )
        
    }

}