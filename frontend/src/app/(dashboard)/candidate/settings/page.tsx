"use client";

import {
  AlertTriangle,
  Download,
  KeyRound,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  useChangePassword,
  useDeleteMyAccount,
  useGetMyPersonalData,
} from "@/hooks";
import { useAuth } from "@/providers/authProvider";

export default function CandidateSettingsPage() {
  const { user } = useAuth();
  const { data: personalDataRes, isLoading: isDataLoading } =
    useGetMyPersonalData(Boolean(user));
  const { mutate: updatePassword, isPending: isPasswordPending } =
    useChangePassword();
  const { mutate: deleteAccount, isPending: isDeletePending } =
    useDeleteMyAccount();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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
    link.download = `talentgraph-personal-data-${user?.id || "export"}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const personalData = personalDataRes?.data;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-border/80 pb-5">
        <h1 className="text-2xl font-black text-foreground">
          Account Security &amp; Data Privacy
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your password credentials, inspect or export your personal
          data snapshot, or request account deletion.
        </p>
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
            Your account is using a temporary password. Please set a new
            password now.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="current-password"
              className="text-xs font-semibold text-foreground"
            >
              Current Password
            </label>
            <Input
              id="current-password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isPasswordPending}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="new-password"
              className="text-xs font-semibold text-foreground"
            >
              New Password
            </label>
            <Input
              id="new-password"
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

      {/* Self-Service Personal Data Snapshot (PDF Slide 14 NFR Privacy) */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>Your Personal Data Snapshot</span>
            </div>
            <p className="text-xs text-muted-foreground">
              View and export a complete copy of your stored TalentGraph
              profile, skills, repositories, and notifications.
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

        {isDataLoading ? (
          <div className="flex h-24 items-center justify-center">
            <Spinner className="size-5 text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-border/60 bg-secondary/30 p-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Account Role
              </span>
              <p className="mt-1 text-xs font-bold text-foreground">
                {personalData?.role || user?.role}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/30 p-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Auth Provider
              </span>
              <p className="mt-1 text-xs font-bold text-foreground">
                {personalData?.authProvider || user?.authProvider}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/30 p-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Notifications Logged
              </span>
              <p className="mt-1 text-xs font-bold text-foreground">
                {personalData?.notifications?.length ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/30 p-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                GitHub Token
              </span>
              <p className="mt-1 text-xs font-bold text-foreground">
                {personalData?.isGithubConnected ? "Active" : "Not Stored"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Self-Service Account Deletion */}
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive">
          <AlertTriangle className="size-4" />
          <span>Delete Account &amp; Revoke OAuth Tokens</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Deleting your account soft-deletes your profile, revokes your stored
          GitHub OAuth token immediately, and signs you out of all active
          sessions.
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
              htmlFor="delete-reason"
              className="block text-xs font-semibold text-foreground"
            >
              Optional Reason for Account Deletion
            </label>
            <Textarea
              id="delete-reason"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Tell us why you are deleting your account (optional)"
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
                <span>Confirm Permanent Deactivation</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
