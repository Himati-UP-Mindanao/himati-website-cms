import { Access, FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isAssistantAdmin: Access<any, User> = ({ req: { user } }) => {
  if (!user) return false;
  return Boolean(user.role.includes("assistant-admin"));
};

export const isAssistantAdminField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false;
  return Boolean(user.role.includes("assistant-admin"));
};
