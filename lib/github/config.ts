export const GITHUB_API = "https://api.github.com";

export function getGithubUsername(): string {
  return process.env.GITHUB_USERNAME || "Soruj24";
}

export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}
