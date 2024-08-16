import { Access, FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isPublished: Access<any, User> = ({ req: { user } }) => {
  if (user && (user.role.includes("admin") || user.role.includes("writer")))
    return true;

  return {
    _status: {
      equals: "published",
    },
  };
};
