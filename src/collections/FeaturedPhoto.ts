import { CollectionConfig, docHasTimestamps } from "payload/types";
import { isAdmin, isAdminField } from "../access/isAdmin";
import { v4 as uuidv4 } from "uuid";
import { isWriter } from "../access/isWriter";
import { isPublished } from "../access/isPublished";
import { isAdminOrAuthor } from "../access/isAdminOrAuthor";

const FeaturedPhoto: CollectionConfig = {
  slug: "featured-photo",
  admin: {
    useAsTitle: "title",
  },
  upload: {
    staticURL: `${process.env.CLOUDFRONT_URL}/featured-photo/images`,
    staticDir: "featured-photo/images",
    disableLocalStorage: true,
  },
  access: {
    create: isWriter,
    // read: isPublished,
    read: () => true,
    update: isAdminOrAuthor,
    delete: () => true,
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
      name: "author",
      label: "Entry Created By",
      type: "relationship",
      relationTo: "himati-staff",
      required: true,
      defaultValue: ({ user }) => user.id,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
    {
      name: "taken-by",
      label: "Taken By",
      type: "relationship",
      relationTo: "himati-staff",
      required: true,
    },
    {
      name: "cutline",
      type: "text",
    },
    {
      name: "alt-text",
      type: "textarea",
    },
  ],
  // hooks: {
  //   // Limit retuned fields for articles
  //   afterRead: [
  //     ({ doc, req }) => {
  //       const {
  //         id,
  //         "alt-text": altText,
  //         cutline,
  //         "taken-by": takenBy,
  //         url,
  //         focalX,
  //         focalY,
  //       } = doc;
  //       if (req.baseUrl.includes("articles")) {
  //         return { id, altText, cutline, takenBy, url, focalX, focalY };
  //       }
  //       return {};
  //     },
  //   ],
  // },
};

export default FeaturedPhoto;
