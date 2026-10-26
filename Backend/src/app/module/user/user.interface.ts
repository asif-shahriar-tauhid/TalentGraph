import type { Role, UserStatus } from "../../../generated/prisma/client";

export interface IUpdateProfilePayload {
  name?: string;
}

export interface IUpdateUserStatusPayload {
  status?: UserStatus;
  role?: Role;
}

export interface IUserFilterRequest {
  searchTerm?: string;
  role?: Role;
  status?: UserStatus;
  page?: number;
  limit?: number;
}
