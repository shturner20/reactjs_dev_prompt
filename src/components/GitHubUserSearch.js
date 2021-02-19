import React from 'react'
import {SearchUsers, GetUserInfo} from '../services/GitHubSearchClient'
import GitHubSearchInput from './GitHubSearchInput'
import GitHubUserInfo from './GitHubUserInfo'
import GitHubPagination from './GitHubPagination'
import UserSearchResultTable from './UserSearchResultTable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from 'bootstrap';


export default class GitHubUserSearch extends React.Component
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
        if(prevState.userInput !== this.state.userInput && this.state.userInput.length >= 3 )
        {
            this.setState({page : 1})
            this.loadSeachUserResult();
        }
    }

    async loadSeachUserResult(pageNum)
    {
        // this.setState({searchResults: null})
        const result = await SearchUsers(this.state.userInput, pageNum === null ? this.state.page : pageNum)

        if(!result['error'])
        {
            this.setState({searchResults: result.data, totalResultCount: result.totalResultCount  })
        }
        else
        {
            alert("Max Number of searches reach please wait 60 seconds to continue search");
        }
    }

    async handleSelectedUser(username)
    {  
        this.setState({user: {}})
        const result = await GetUserInfo(username)

        if(!result.error)
        {
            this.setState({user: result.data})
        }
        else
        {
            alert("Max Number of searches reach please wait 60 seconds to continue search");
        }

       
    }

    handlePageChange(pageNum)
    {
        this.setState({page: pageNum})
        this.loadSeachUserResult(pageNum);
    }

    render() {

        const isLoading = this.state.searchResults === [];

        return(
            <div>
                <Row>
                    <Col> 
                        <GitHubSearchInput userInput={this.state.userInput} onChange={this.handleChange}/>
                    </Col>
                </Row>
                <Row> <Col>  <h6> Total Found: {this.state.totalResultCount} </h6> </Col></Row>
                <Row>
                    <Col xs={3}> 
                       
                        <UserSearchResultTable isLoading={isLoading} usersResult={this.state.searchResults} totalResultCount={this.state.totalResultCount} onSelected={this.handleSelectedUser} />
                        <GitHubPagination pageNum={this.state.page} totalResultCount={this.state.totalResultCount} onPageChange={this.handlePageChange} /> 
                       
                    </Col>
                    <Col> 
                        <GitHubUserInfo user={this.state.user} />
                    </Col>
                </Row>
            </div>
        )
        
    }

}