export const githubQuery = `
  query {
    viewer {
      name
    }
    search(query: "user:kadiramin sort:updated-desc", type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          name
          description
          id
          url
          licenseInfo {
            spdxId
          }
          viewerSubscription
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
