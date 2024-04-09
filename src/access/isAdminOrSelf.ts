import { Access } from "payload/config";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === "admin") {
      return true;
    }

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    };
  }

  // Reject everyone else
  return false;
};
