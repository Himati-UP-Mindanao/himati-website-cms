import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminField } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "first-name",
          type: "text",
          required: true,
        },
        {
          name: "last-name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "role",
      type: "radio",
      saveToJWT: true,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Writer",
          value: "writer",
        },
      ],
    },
    // {
    //   name: "bio",
    //   type: "textarea",
    //   admin: {
    //     condition: (data, siblingData, { user }) => {
    //       return data.role === "writer";
    //     },
    //   },
    // },
  ],
};

export default Users;
