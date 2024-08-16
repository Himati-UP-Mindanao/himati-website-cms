import {
  Access,
  CollectionAfterChangeHook,
  CollectionConfig,
} from "payload/types";
import { isAdmin, isAdminField } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { v4 as uuidv4 } from "uuid";

const HimatiStaff: CollectionConfig = {
  slug: "himati-staff",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    // TODO: Fix Access Control
    delete: ({ req: { user } }) => {
      if (user) {
        if (
          user.role.includes("admin") ||
          user.role.includes("assistant-admin")
        ) {
          // Allow admins and assistant-admins to delete all records except for their own or a specific email
          return {
            or: [
              {
                id: {
                  not_equals: user.id,
                },
              },
              {
                email: {
                  not_equals: "himati.upmin@up.edu.ph",
                },
              },
            ],
          };
        }
      }
      // If the user does not have the required role, deny access
      return false;
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, req, previousDoc, operation }) => {
        if (operation === "create") {
        }
      },
    ],
  },
  fields: [
    {
      name: "id",
      type: "text",
      access: {
        update: () => false,
      },
      hooks: {
        beforeValidate: [() => uuidv4()],
      },
      admin: {
        condition: () => false,
      },
    },
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
      type: "select",
      saveToJWT: true,
      hasMany: true,
      access: {
        create: isAdminField,
        // update: isAdminField,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Assistant Admin",
          value: "assistant-admin",
        },
        {
          label: "Writer",
          value: "writer",
        },
      ],
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        condition: (data, siblingData, { user }) => {
          return data.role === "writer";
        },
      },
    },
    {
      name: "position",
      type: "radio",
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      options: [
        {
          label: "Editor-in-Chief",
          value: "editor-in-chief",
        },
        {
          label: "Associate Editor",
          value: "associate-editor",
        },
        {
          label: "Managing Editor",
          value: "managing-editor",
        },
        {
          label: "News Editor",
          value: "news-editor",
        },
        {
          label: "Opinion Editor",
          value: "opinion-editor",
        },
        {
          label: "Features Editor",
          value: "features-editor",
        },
        {
          label: "Sports Editor",
          value: "sports-editor",
        },
        {
          label: "Layout Writer",
          value: "layout-writer",
        },
        {
          label: "Staff Writer",
          value: "staff-writer",
        },
      ],
    },
    {
      label: "Bionote",
      name: "bionote",
      type: "textarea",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "profile-photo",
      // required: true,
    },
  ],
};

export default HimatiStaff;
