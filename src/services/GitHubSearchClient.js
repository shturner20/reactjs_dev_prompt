import { Octokit } from "@octokit/core"

const octokit = new Octokit({ auth: `f5defa8f91ec2134433e8d7260f29c5879c3007d` });


export async function SearchUsers(searchtext,pageNum)
{
  console.log("Page:" + pageNum);
  try {
      const response = await octokit.request('GET /search/users', {
        q:  searchtext + "in:login+in:email" ,
        per_page: 20,
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