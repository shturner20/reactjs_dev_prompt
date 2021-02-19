import React from 'react'

export default class GitHubSearchInput extends React.Component
{
   
    render(){
        return(
            <div>
                <input className="SearchBox" type="text" onChange={this.props.onChange} value={this.props.userInput} placeholder="Type here to search by Username or Email"  />
            </div>
        )
    }
}