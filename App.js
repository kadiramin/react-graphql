import { GITHUB_TOKEN } from "./db";
import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import RepoInfo from "./RepoInfo";
import { githubQuery } from "./query"; // Import the query from query.js

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState([]); // initialize as empty array
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(null);
  const githubToken = GITHUB_TOKEN;

  const fetchData = useCallback(async (cursor = null) => {
    try {
      const queryWithPagination = `
        ${githubQuery}
        ${cursor ? `, after: "${cursor}"` : ""}
      `;
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryWithPagination,  // Use the query with pagination
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);  // log response for debugging

      const viewer = data?.data?.viewer ?? null;
      const repos = data?.data?.search?.nodes ?? []; // safely handle undefined response
      const pageInfo = data?.data?.search?.pageInfo ?? {};

      setUserName(viewer?.name || 'No username'); // provide default value for userName
      setRepoList((prevRepos) => [...prevRepos, ...repos]); // Append new repos
      setHasNextPage(pageInfo.hasNextPage);
      setEndCursor(pageInfo.endCursor);

    } catch (err) {
      console.error('Error:', err);
    }
  }, [githubToken]);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch next page if hasNextPage is true
  const fetchNextPage = () => {
    if (hasNextPage && endCursor) {
      fetchData(endCursor);
    }
  };

  // Filter out duplicate repositories based on `repo.id`
  const uniqueRepos = Array.from(new Map(
      repoList.map((repo) => [repo.id, repo]) // Use `repo.id` as the unique key
  ).values());

  return (
      <div className="App container mt-5">
        <h1 className={'text-primary'}>
          <i className={'bi bi-diagram-2-fill'}></i>
          My GitHub Repos
        </h1>
        <p> User Name: {userName}</p>
        {uniqueRepos.length > 0 ? (
            <ul className={'list-group list-group-flush'}>
              {uniqueRepos.map((repo) => (
                  <RepoInfo
                      key={repo.id} // Use `repo.id` directly for a unique key
                      repo={repo}
                  />
              ))}
            </ul>
        ) : (
            <p>No repositories found.</p>
        )}
        {hasNextPage && (
            <button className="btn btn-primary" onClick={fetchNextPage}>
              Load More Repos
            </button>
        )}
      </div>
  );
}

export default App;
