import { ghFetch } from "@/lib/github/client";
import type { RawUser, RawRepo, GitHubProfile } from "@/lib/github/types";

export async function fetchProfile(username: string): Promise<GitHubProfile | null> {
  const user = await ghFetch<RawUser>(`/users/${username}`);
  if (!user) return null;

  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`);
  const stars = repos?.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0;
  const forks = repos?.reduce((sum, r) => sum + r.forks_count, 0) ?? 0;

  return {
    username: user.login,
    name: user.name,
    avatar: user.avatar_url,
    bio: user.bio,
    company: user.company,
    location: user.location,
    blog: user.blog,
    twitter: user.twitter_username,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars,
    forks,
    joinedAt: user.created_at,
  };
}
