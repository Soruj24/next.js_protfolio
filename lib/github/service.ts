export {
  fetchAllGitHubData,
  fetchGitHubData,
  getGitHubUsername,
} from "@/lib/github/index";

export type {
  GitHubProfile,
  GitHubRepo,
  GitHubCommit,
  GitHubIssue,
  GitHubPullRequest,
  GitHubRelease,
  GitHubContributor,
  GitHubLanguages,
  ContributionDay,
  GitHubDataResult,
} from "@/lib/github/types";
