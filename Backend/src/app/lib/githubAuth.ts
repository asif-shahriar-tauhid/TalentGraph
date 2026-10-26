import httpStatus from "http-status";
import config from "../config";
import { AppError } from "../utils/AppError";

export interface IGithubUserProfile {
  id: string;
  login: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export const getGithubAuthUrl = (state?: string): string => {
  const rootUrl = "https://github.com/login/oauth/authorize";
  const options = {
    client_id: config.github_client_id,
    redirect_uri: config.github_callback_url,
    scope: "read:user user:email",
    state: state || "",
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export const getGithubAccessToken = async (code: string): Promise<string> => {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: config.github_client_id,
      client_secret: config.github_client_secret,
      code,
    }),
  });

  if (!response.ok) {
    throw new AppError(httpStatus.BAD_GATEWAY, "Failed to exchange GitHub authorization code.");
  }

  const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string };

  if (data.error || !data.access_token) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      data.error_description || "Invalid or expired GitHub authorization code.",
    );
  }

  return data.access_token;
};

export const getGithubUserProfile = async (accessToken: string): Promise<IGithubUserProfile> => {
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "TalentGraph-Backend",
      Accept: "application/vnd.github+json",
    },
  });

  if (!userResponse.ok) {
    throw new AppError(httpStatus.BAD_GATEWAY, "Failed to fetch user profile from GitHub.");
  }

  const ghUser = (await userResponse.json()) as {
    id: number;
    login: string;
    name?: string;
    email?: string;
    avatar_url?: string;
  };

  let primaryEmail = ghUser.email;

  if (!primaryEmail) {
    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "TalentGraph-Backend",
        Accept: "application/vnd.github+json",
      },
    });

    if (emailsResponse.ok) {
      const emails = (await emailsResponse.json()) as Array<{
        email: string;
        primary: boolean;
        verified: boolean;
      }>;
      const primary = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
      if (primary) {
        primaryEmail = primary.email;
      }
    }
  }

  if (!primaryEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, "No email found associated with your GitHub account.");
  }

  return {
    id: String(ghUser.id),
    login: ghUser.login,
    name: ghUser.name || ghUser.login,
    email: primaryEmail.toLowerCase(),
    avatarUrl: ghUser.avatar_url || "",
  };
};

export const githubAuth = {
  getGithubAuthUrl,
  getGithubAccessToken,
  getGithubUserProfile,
};
