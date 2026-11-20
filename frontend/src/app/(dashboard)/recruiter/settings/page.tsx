"use client";

import {
  AlertTriangle,
  Download,
  KeyRound,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  useChangePassword,
  useDeleteMyAccount,
  useDeleteProfileImage,
  useGetMyPersonalData,
  useUpdateProfile,
  useUploadProfileImage,
} from "@/hooks";
import { useAuth } from "@/providers/authProvider";

export default function RecruiterSettingsPage() {
  const { user } = useAuth();
  const { data: personalDataRes, isLoading: isDataLoading } =
    useGetMyPersonalData(Boolean(user));
  const { mutate: updateName, isPending: isNamePending } = useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isAvatarUploading } =
    useUploadProfileImage();
  const { mutate: removeAvatar, isPending: isAvatarRemoving } =
    useDeleteProfileImage();
  const { mutate: updatePassword, isPending: isPasswordPending } =
    useChangePassword();
  const { mutate: deleteAccount, isPending: isDeletePending } =
    useDeleteMyAccount();

  const [draftName, setDraftName] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const fullName = draftName ?? user?.name ?? "";

  const handleSaveName = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = fullName.trim();
    if (!trimmed) return;
    updateName({ name: trimmed });
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      gooeyToast.error("Missing Fields", {
        description: "Enter both your current password and new password.",
      });
      return;
    }
    updatePassword(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
        },
      },
    );
  };

  const handleExportPersonalData = () => {
    if (!personalDataRes?.data) return;
    const blob = new Blob([JSON.stringify(personalDataRes.data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `talentgraph-recruiter-data-${user?.id || "export"}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const personalData = personalDataRes?.data;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-border/80 pb-5">
        <h1 className="text-2xl font-black text-foreground">
          Recruiter Account &amp; Security Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your recruiter identity, avatar, password credentials, and data
          privacy preferences.
        </p>
      </div>

      {/* Profile Identity & Avatar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <User className="size-4 text-primary" />
            <span>Profile Photo</span>
          </div>
          <div className="flex items-center gap-3">
            <UserAvatar
              name={user?.name}
              imageUrl={user?.imageUrl}
              size="lg"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground truncate">
                {user?.name || "Recruiter"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "Not signed in"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
            {user?.imageUrl && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isAvatarRemoving}
                onClick={() => removeAvatar()}
                className="h-8 text-xs text-destructive"
              >
                <Trash2 className="size-3.5 mr-1" />
                <span>Remove</span>
              </Button>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSaveName}
          className="md:col-span-2 rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <User className="size-4 text-primary" />
              <span>Recruiter Identity</span>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="recruiter-full-name"
                className="text-xs font-semibold text-foreground"
              >
                Full Name (synchronized across user &amp; recruiter profile)
              </label>
              <Input
                id="recruiter-full-name"
                value={fullName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Your full name"
                disabled={isNamePending}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={isNamePending || !fullName.trim()}
              className="gap-1.5 text-xs font-semibold"
            >
              {isNamePending ? (
                <Spinner className="size-3.5" />
              ) : (
                <Save className="size-3.5" />
              )}
              <span>Save Name</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Password Change */}
      <form
        onSubmit={handlePasswordSubmit}
        className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <KeyRound className="size-4 text-primary" />
          <span>Change Account Password</span>
        </div>

        {user?.needPasswordChange && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400">
            Your Sub-Recruiter account is using a temporary password. Please set
            a permanent password below.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="recruiter-current-password"
              className="text-xs font-semibold text-foreground"
            >
              Current / Temporary Password
            </label>
            <Input
              id="recruiter-current-password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isPasswordPending}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="recruiter-new-password"
              className="text-xs font-semibold text-foreground"
            >
              New Password
            </label>
            <Input
              id="recruiter-new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 8 chars, 1 uppercase, 1 special"
              disabled={isPasswordPending}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            disabled={isPasswordPending}
            className="gap-1.5 text-xs font-semibold"
          >
            {isPasswordPending && <Spinner className="size-3.5" />}
            <span>Update Password</span>
          </Button>
        </div>
      </form>

      {/* Personal Data Export */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>Personal Data Export</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Download your account profile, company affiliation, and
              notification history in JSON format.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={isDataLoading || !personalData}
            onClick={handleExportPersonalData}
            className="gap-1.5 text-xs font-semibold shrink-0"
          >
            <Download className="size-3.5" />
            <span>Download JSON Export</span>
          </Button>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive">
          <AlertTriangle className="size-4" />
          <span>Deactivate Recruiter Account</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Soft-deleting your account revokes active sessions and marks your
          recruiter account as deleted.
        </p>
        {!confirmDeleteOpen ? (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => setConfirmDeleteOpen(true)}
            className="gap-1.5 text-xs font-semibold"
          >
            <Trash2 className="size-3.5" />
            <span>Delete My Account</span>
          </Button>
        ) : (
          <div className="space-y-3 rounded-xl border border-destructive/30 bg-card p-4">
            <label
              htmlFor="recruiter-delete-reason"
              className="block text-xs font-semibold text-foreground"
            >
              Optional Reason
            </label>
            <Textarea
              id="recruiter-delete-reason"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Reason for deleting account (optional)"
              rows={2}
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setConfirmDeleteOpen(false)}
                disabled={isDeletePending}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={isDeletePending}
                onClick={() =>
                  deleteAccount(
                    deleteReason.trim()
                      ? { reason: deleteReason.trim() }
                      : undefined,
                  )
                }
                className="gap-1.5 text-xs font-semibold"
              >
                {isDeletePending ? (
                  <Spinner className="size-3.5" />
                ) : (
                  <Trash2 className="size-3.5" />
                )}
                <span>Confirm Deactivation</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
