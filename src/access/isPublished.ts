import { Access } from "payload/config";
import { User } from "../payload-types";

export const isPublished: Access<any, User> = ({ req: { user } }) => {
  if (user && (user.role === "admin" || user.role === "writer")) return true;

  return {
    _status: {
      equals: "published",
    },
  };
};
