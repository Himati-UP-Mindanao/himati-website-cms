import { Access, FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isWriter: Access<any, User> = ({ req: { user } }) => {
  if (!user) return false;
  return Boolean(user.role.includes("writer"));
};

export const isWriterField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false;
  return Boolean(user.role.includes("writer"));
};
