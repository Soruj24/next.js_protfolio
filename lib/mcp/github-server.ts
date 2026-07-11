import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchAllGitHubData, getGitHubUsername } from "@/lib/github/service";

export function createGitHubMcpServer() {
  const server = new McpServer({
    name: "github-portfolio",
    version: "2.0.0",
  });

  server.tool(
    "get_github_data",
    "Fetch all GitHub data: profile, repos, commits, issues, PRs, releases, contributors, languages, contribution graph",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }],
      };
    },
  );

  server.tool(
    "get_profile",
    "Fetch GitHub profile statistics: followers, stars, forks, repos count",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.profile) }],
      };
    },
  );

  server.tool(
    "get_repos",
    "Fetch all public repositories with stars, forks, languages, and topics",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.repos) }],
      };
    },
  );

  server.tool(
    "get_recent_commits",
    "Fetch recent commits across all repositories",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.recentCommits) }],
      };
    },
  );

  server.tool(
    "get_issues",
    "Fetch recent GitHub issues",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.issues) }],
      };
    },
  );

  server.tool(
    "get_pull_requests",
    "Fetch recent GitHub pull requests",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.pullRequests) }],
      };
    },
  );

  server.tool(
    "get_releases",
    "Fetch recent GitHub releases",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.releases) }],
      };
    },
  );

  server.tool(
    "get_contributors",
    "Fetch top contributors across repositories",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.contributors) }],
      };
    },
  );

  server.tool(
    "get_languages",
    "Fetch programming languages breakdown by bytes written",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.languages) }],
      };
    },
  );

  server.tool(
    "get_contribution_graph",
    "Fetch contribution activity graph data for the last 20 weeks",
    {},
    async () => {
      const data = await fetchAllGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.contributionGraph) }],
      };
    },
  );

  return server;
}
