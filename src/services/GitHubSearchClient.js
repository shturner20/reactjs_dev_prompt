import { Octokit } from "@octokit/core"

const octokit = new Octokit()

export async function SearchUsers(searchtext,pageNum)
{
  try {
      const response = await octokit.request('GET /search/users', {
        q:  searchtext + "in:login+in:email" ,
        per_page: 100,
        page:pageNum
      })
     
      return  {data: response.data.items, totalResultCount: response.data.total_count, error: null};
  } catch (error) {
    return {error: error};
  }
    
}

export async function GetUserInfo(username)
{
  try {
    const response = await octokit.request('GET /users/{username}', {
      username: username
    })
    console.log(response.data);
    return {data: response.data};
  } catch (error) {
    return {error: error} ;
  }
    
}