import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchGitHubData } from "@/lib/github/service";

export function createGitHubMcpServer() {
  const server = new McpServer({
    name: "github-portfolio",
    version: "1.0.0",
  });

  server.tool(
    "get_recent_commits",
    "Fetch real recent commits from GitHub push events",
    {},
    async () => {
      const data = await fetchGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.recentCommits) }],
      };
    }
  );

  server.tool(
    "get_profile_stats",
    "Fetch GitHub profile statistics including repos, stars, forks, followers",
    {},
    async () => {
      const data = await fetchGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data.stats) }],
      };
    }
  );

  server.tool(
    "get_github_data",
    "Fetch all GitHub data: profile stats and recent commits in one call",
    {},
    async () => {
      const data = await fetchGitHubData();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }],
      };
    }
  );

  return server;
}
