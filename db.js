export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const github ={
  basURL: 'https://api-github.com/graphql',
  username:"kadiramin",
  headers:{
    "content-type": "application/json",
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  }

}
export default github;