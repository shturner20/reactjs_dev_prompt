import { Octokit } from "@octokit/core"

const octokit = new Octokit({ auth: `03a7a99f3168bee482c193fe696e237e3d690eee` });


export async function SearchUsers(searchtext,pageNum)
{
  try {
      const response = await octokit.request('GET /search/users', {
        q:  searchtext + "in:login+in:email" ,
        per_page: 20,
        page:pageNum
      })
     
      return  {data: response.data.items, totalResultCount: response.data.total_count, error: null};
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return {error: error} ;
  }
    
}