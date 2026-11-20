"use client";

import {
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Link2,
  Plus,
  RefreshCw,
  Save,
  Star,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { getGithubAuthUrl } from "@/api/auth.api";
import { GithubIcon } from "@/asset/svg/GithubIcon";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  useCandidateCVStatus,
  useCandidateParsedCV,
  useCandidateProfile,
  useDeleteProfileImage,
  useDisconnectGithub,
  useGithubPublicRepos,
  useGithubSyncStatus,
  useSelectGithubRepos,
  useSyncGithubRepos,
  useUpdateCandidateProfile,
  useUpdateProfile,
  useUploadCandidateCV,
  useUploadProfileImage,
} from "@/hooks";
import { useAuth } from "@/providers/authProvider";
import type { EducationItem, GitHubRepoItem } from "@/types";

export default function CandidateProfilePage() {
  const { user } = useAuth();
  const { data: profileRes, isLoading: isProfileLoading } =
    useCandidateProfile(Boolean(user));
  const { data: cvStatusRes } = useCandidateCVStatus(Boolean(user));
  const cvStatus = cvStatusRes?.data;

  const { data: parsedCvRes, refetch: refetchParsedCv } = useCandidateParsedCV(
    cvStatus?.status === "COMPLETED",
  );
  const { data: reposRes, isLoading: isReposLoading } = useGithubPublicRepos(
    Boolean(user),
  );
  const { data: syncStatusRes } = useGithubSyncStatus(Boolean(user));

  const { mutate: updateUserName, isPending: isNameSaving } =
    useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isAvatarUploading } =
    useUploadProfileImage();
  const { mutate: removeAvatar, isPending: isAvatarRemoving } =
    useDeleteProfileImage();
  const { mutate: updateCandidate, isPending: isCandidateSaving } =
    useUpdateCandidateProfile();
  const { mutate: uploadCV, isPending: isCVUploading } =
    useUploadCandidateCV();
  const { mutate: saveSelectedRepos, isPending: isSavingRepos } =
    useSelectGithubRepos();
  const { mutate: triggerGithubSync, isPending: isSyncingGithub } =
    useSyncGithubRepos();
  const { mutate: disconnectGithub, isPending: isDisconnectingGithub } =
    useDisconnectGithub();

  const profile = profileRes?.data;
  const syncStatus = syncStatusRes?.data;
  const profileLinks =
    profile?.links && typeof profile.links === "object"
      ? (profile.links as Record<string, string>)
      : {};

  const [draftName, setDraftName] = useState<string | null>(null);
  const [draftHeadline, setDraftHeadline] = useState<string | null>(null);
  const [draftGithubLink, setDraftGithubLink] = useState<string | null>(null);
  const [draftLinkedinLink, setDraftLinkedinLink] = useState<string | null>(
    null,
  );
  const [draftPortfolioLink, setDraftPortfolioLink] = useState<string | null>(
    null,
  );
  const [draftEducation, setDraftEducation] = useState<EducationItem[] | null>(
    null,
  );
  const [newEdu, setNewEdu] = useState<EducationItem>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });
  const [repoSelectionOverrides, setRepoSelectionOverrides] = useState<
    Record<string, boolean>
  >({});

  const fullName = draftName ?? profile?.name ?? user?.name ?? "";
  const headline = draftHeadline ?? profile?.headline ?? "";
  const githubLink = draftGithubLink ?? profileLinks.github ?? "";
  const linkedinLink = draftLinkedinLink ?? profileLinks.linkedin ?? "";
  const portfolioLink =
    draftPortfolioLink ?? profileLinks.website ?? profileLinks.portfolio ?? "";
  const educationList: EducationItem[] =
    draftEducation ??
    (Array.isArray(profile?.education) ? profile.education : []);

  const isRepoSelected = (repo: GitHubRepoItem) =>
    repoSelectionOverrides[repo.repoUrl] ?? Boolean(repo.isSelected);

  const handleSaveIdentity = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    if (trimmedName && trimmedName !== (profile?.name || user?.name)) {
      updateUserName({ name: trimmedName });
    }

    const links: Record<string, string> = {};
    if (githubLink.trim()) links.github = githubLink.trim();
    if (linkedinLink.trim()) links.linkedin = linkedinLink.trim();
    if (portfolioLink.trim()) links.website = portfolioLink.trim();

    updateCandidate({
      headline: headline.trim(),
      links,
      education: educationList,
    });
  };

  const handleAddEducation = () => {
    if (!newEdu.institution.trim()) {
      gooeyToast.error("Institution Required", {
        description: "Please enter the institution name.",
      });
      return;
    }
    const updated = [
      ...educationList,
      {
        institution: newEdu.institution.trim(),
        degree: newEdu.degree?.trim() || undefined,
        fieldOfStudy: newEdu.fieldOfStudy?.trim() || undefined,
        startDate: newEdu.startDate?.trim() || undefined,
        endDate: newEdu.endDate?.trim() || undefined,
      },
    ];
    setDraftEducation(updated);
    setNewEdu({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    });
    updateCandidate({ education: updated });
  };

  const handleRemoveEducation = (index: number) => {
    const updated = educationList.filter((_, idx) => idx !== index);
    setDraftEducation(updated);
    updateCandidate({ education: updated });
  };

  const handleConnectGithubOAuth = async () => {
    try {
      const res = await getGithubAuthUrl("/candidate/profile");
      if (res?.data?.url) {
        window.location.assign(res.data.url);
      }
    } catch {
      gooeyToast.error("GitHub OAuth Error", {
        description: "Could not generate GitHub authorization URL.",
      });
    }
  };

  const handleSaveRepoSelection = () => {
    const repos = reposRes?.data ?? [];
    if (repos.length === 0) return;

    saveSelectedRepos({
      repositories: repos.map((repo: GitHubRepoItem) => ({
        repoName: repo.repoName,
        repoUrl: repo.repoUrl,
        isSelected: isRepoSelected(repo),
        stargazers: repo.stargazers,
        languages:
          repo.languages && typeof repo.languages === "object"
            ? (repo.languages as Record<string, unknown>)
            : {},
        dependencies:
          repo.dependencies && typeof repo.dependencies === "object"
            ? (repo.dependencies as Record<string, unknown>)
            : {},
        lastCommitAt: repo.lastCommitAt || undefined,
      })),
    });
  };

  const repos = reposRes?.data ?? [];
  const selectedCount = repos.filter(isRepoSelected).length;
  const quotaUsed =
    syncStatus?.quotaDetails?.used ?? profile?.syncQuota?.used ?? 0;
  const quotaTotal =
    syncStatus?.quotaDetails?.total ?? profile?.syncQuota?.total ?? 3;
  const quotaRemaining =
    syncStatus?.quotaDetails?.remaining ??
    profile?.syncQuota?.remaining ??
    Math.max(0, quotaTotal - quotaUsed);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-foreground">
            Candidate Profile &amp; Evidence Sources
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your developer identity, upload your CV for extraction, and
            select public GitHub repositories for SkillGraph verification.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit border-primary/30 bg-primary/10 text-primary font-bold text-xs"
        >
          {profile?.subscriptionTier || "FREE"} TIER
        </Badge>
      </div>

      {/* Section 1: Avatar & Core Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <User className="size-4 text-primary" />
            <span>Profile Avatar</span>
          </div>

          <div className="flex items-center gap-4">
            <UserAvatar
              name={profile?.name || user?.name}
              imageUrl={profile?.imageUrl || user?.imageUrl}
              size="lg"
            />
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-bold text-foreground truncate">
                {profile?.name || user?.name || "Candidate"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {profile?.email || user?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <label className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 text-xs font-semibold text-foreground hover:bg-secondary">
              {isAvatarUploading ? (
                <Spinner className="size-3.5" />
              ) : (
                <Upload className="size-3.5" />
              )}
              <span>{isAvatarUploading ? "Uploading..." : "Upload Photo"}</span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={isAvatarUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadAvatar(file);
                  e.target.value = "";
                }}
              />
            </label>

            {(profile?.imageUrl || user?.imageUrl) && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isAvatarRemoving}
                onClick={() => removeAvatar()}
                className="h-8 text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="size-3.5 mr-1" />
                <span>Remove</span>
              </Button>
            )}
          </div>
        </div>

        {/* Identity, Headline & Links Form */}
        <form
          onSubmit={handleSaveIdentity}
          className="lg:col-span-2 rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Link2 className="size-4 text-primary" />
              <span>Developer Identity &amp; Portfolio Links</span>
            </div>
            {isProfileLoading && <Spinner className="size-4 text-primary" />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="candidate-name"
                className="text-xs font-semibold text-foreground"
              >
                Full Name
              </label>
              <Input
                id="candidate-name"
                value={fullName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="candidate-headline"
                className="text-xs font-semibold text-foreground"
              >
                Professional Headline
              </label>
              <Input
                id="candidate-headline"
                value={headline}
                onChange={(e) => setDraftHeadline(e.target.value)}
                placeholder="e.g., Full-Stack TypeScript & Go Engineer"
                maxLength={250}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="candidate-github-link"
                className="text-xs font-semibold text-foreground"
              >
                GitHub Profile URL
              </label>
              <Input
                id="candidate-github-link"
                value={githubLink}
                onChange={(e) => setDraftGithubLink(e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="candidate-linkedin-link"
                className="text-xs font-semibold text-foreground"
              >
                LinkedIn URL
              </label>
              <Input
                id="candidate-linkedin-link"
                value={linkedinLink}
                onChange={(e) => setDraftLinkedinLink(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="candidate-portfolio-link"
                className="text-xs font-semibold text-foreground"
              >
                Portfolio / Website
              </label>
              <Input
                id="candidate-portfolio-link"
                value={portfolioLink}
                onChange={(e) => setDraftPortfolioLink(e.target.value)}
                placeholder="https://yourportfolio.dev"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size="sm"
              disabled={isCandidateSaving || isNameSaving}
              className="gap-1.5 text-xs font-semibold"
            >
              {isCandidateSaving || isNameSaving ? (
                <Spinner className="size-3.5" />
              ) : (
                <Save className="size-3.5" />
              )}
              <span>Save Profile Changes</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Section 2: CV Upload & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CV Upload & Parsing Status */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <FileText className="size-4 text-primary" />
              <span>CV Upload &amp; Parsing Pipeline</span>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono">
              {cvStatus?.status || (profile?.cvUrl ? "UPLOADED" : "NOT_UPLOADED")}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Upload your resume in PDF (.pdf) or Word (.docx) format (max 10MB).
            Your CV is stored as an immutable snapshot when you apply to jobs
            and parsed to ground your SkillGraph.
          </p>

          <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {profile?.cvUrl ? "CV Document Uploaded" : "No CV uploaded yet"}
              </p>
              {profile?.cvUrl && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  <span>View Stored CV</span>
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>

            <label className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
              {isCVUploading ? (
                <Spinner className="size-3.5" />
              ) : (
                <Upload className="size-3.5" />
              )}
              <span>
                {isCVUploading
                  ? "Uploading..."
                  : profile?.cvUrl
                    ? "Replace CV (PDF/DOCX)"
                    : "Upload CV (PDF/DOCX)"}
              </span>
              <input
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                disabled={isCVUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadCV(file);
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          {cvStatus?.errorSummary && (
            <p className="text-xs text-destructive">
              Parsing error: {cvStatus.errorSummary}
            </p>
          )}

          {cvStatus?.status === "COMPLETED" && (
            <div className="rounded-xl border border-border/60 bg-secondary/30 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">
                  Extracted CV Skills
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => refetchParsedCv()}
                  className="h-7 text-[11px]"
                >
                  Refresh Parsed Data
                </Button>
              </div>
              {parsedCvRes?.data?.parsedData?.skills?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {parsedCvRes.data.parsedData.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px]">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-muted-foreground">
                  CV parsed. Extracted skills are synced to your SkillGraph.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Education History */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <GraduationCap className="size-4 text-primary" />
            <span>Education History</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Institution (e.g., North South University)"
              value={newEdu.institution}
              onChange={(e) =>
                setNewEdu((prev) => ({ ...prev, institution: e.target.value }))
              }
            />
            <Input
              placeholder="Degree (e.g., B.Sc. in CSE)"
              value={newEdu.degree || ""}
              onChange={(e) =>
                setNewEdu((prev) => ({ ...prev, degree: e.target.value }))
              }
            />
            <Input
              placeholder="Start Year (e.g., 2022)"
              value={newEdu.startDate || ""}
              onChange={(e) =>
                setNewEdu((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
            <div className="flex gap-2">
              <Input
                placeholder="End Year (e.g., 2026)"
                value={newEdu.endDate || ""}
                onChange={(e) =>
                  setNewEdu((prev) => ({ ...prev, endDate: e.target.value }))
                }
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddEducation}
                disabled={isCandidateSaving}
                className="shrink-0 gap-1"
              >
                <Plus className="size-3.5" />
                <span>Add</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            {educationList.length === 0 ? (
              <p className="text-xs text-muted-foreground py-3 text-center border border-dashed border-border rounded-xl">
                No education entries added yet.
              </p>
            ) : (
              educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-secondary/30 p-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">
                      {edu.institution}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {[edu.degree, edu.fieldOfStudy]
                        .filter(Boolean)
                        .join(" • ") || "Degree"}{" "}
                      {edu.startDate || edu.endDate
                        ? `(${edu.startDate || ""} - ${edu.endDate || "Present"})`
                        : ""}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveEducation(idx)}
                    className="size-7 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Section 3: GitHub Repository Selection & Evidence Sync */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GithubIcon className="size-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">
                GitHub Repositories &amp; Evidence Ingestion
              </h2>
              <Badge variant="outline" className="text-[10px] font-mono">
                Quota: {quotaUsed}/{quotaTotal} used
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Select the public repositories you want TalentGraph to analyze for
              languages, dependencies, and commit evidence (maximum 3 manual
              syncs per calendar month in Asia/Dhaka time).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {user?.isGithubConnected ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isDisconnectingGithub}
                onClick={() => disconnectGithub()}
                className="text-xs"
              >
                Disconnect GitHub
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleConnectGithubOAuth}
                className="gap-1.5 text-xs font-semibold"
              >
                <GithubIcon className="size-3.5" />
                <span>Connect GitHub OAuth</span>
              </Button>
            )}

            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isSavingRepos || repos.length === 0}
              onClick={handleSaveRepoSelection}
              className="gap-1.5 text-xs font-semibold"
            >
              {isSavingRepos ? (
                <Spinner className="size-3.5" />
              ) : (
                <CheckCircle2 className="size-3.5 text-emerald-500" />
              )}
              <span>Save Selection ({selectedCount})</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant="default"
              disabled={
                isSyncingGithub || selectedCount === 0 || quotaRemaining <= 0
              }
              onClick={() => triggerGithubSync()}
              className="gap-1.5 text-xs font-semibold"
            >
              {isSyncingGithub ? (
                <Spinner className="size-3.5" />
              ) : (
                <RefreshCw className="size-3.5" />
              )}
              <span>Sync Selected ({quotaRemaining} left)</span>
            </Button>
          </div>
        </div>

        {isReposLoading ? (
          <div className="flex h-36 items-center justify-center">
            <Spinner className="size-5 text-primary" />
          </div>
        ) : repos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-6 text-center space-y-2">
            <p className="text-xs font-bold text-foreground">
              No public GitHub repositories loaded
            </p>
            <p className="text-[11px] text-muted-foreground max-w-md mx-auto">
              Connect your GitHub account via OAuth or add your GitHub profile
              URL above and save your profile to load your public repositories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {repos.map((repo) => {
              const isChecked = isRepoSelected(repo);
              const languages =
                repo.languages && typeof repo.languages === "object"
                  ? Object.keys(repo.languages as Record<string, unknown>)
                  : [];

              return (
                <label
                  key={repo.repoUrl}
                  className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-colors ${
                    isChecked
                      ? "border-primary bg-primary/5"
                      : "border-border/70 bg-secondary/20 hover:bg-secondary/40"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            setRepoSelectionOverrides((prev) => ({
                              ...prev,
                              [repo.repoUrl]: e.target.checked,
                            }))
                          }
                          className="size-4 accent-primary rounded"
                        />
                        <span className="text-xs font-bold text-foreground truncate">
                          {repo.repoName}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                        <Star className="size-3 text-amber-500" />
                        {repo.stargazers}
                      </span>
                    </div>

                    {languages.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {languages.slice(0, 4).map((lang) => (
                          <span
                            key={lang}
                            className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-[10px] text-muted-foreground">
                    <span>
                      {repo.lastCommitAt
                        ? `Updated ${new Date(repo.lastCommitAt).toLocaleDateString()}`
                        : "Public repo"}
                    </span>
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-0.5 text-primary hover:underline"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
