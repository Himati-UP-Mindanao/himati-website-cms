import { Access, FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isAdmin: Access<any, User> = ({ req: { user } }) => {
  if (!user) return false;
  return Boolean(user.role === "admin");
};

export const isAdminField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false;
  return Boolean(user.role === "admin");
};
