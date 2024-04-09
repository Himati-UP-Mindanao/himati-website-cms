import { Access } from "payload/config";
import { User } from "../payload-types";

export const isAdminOrAuthor: Access<any, User> = ({ req: { user } }) => {
  if (user) {
    if (user.role === "admin") {
      return true;
    }

    return {
      "author.email": {
        equals: user.email,
      },
    };
  }

  return false;
};
