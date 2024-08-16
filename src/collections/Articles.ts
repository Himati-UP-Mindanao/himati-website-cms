import { CollectionConfig } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";
import { v4 as uuidv4 } from "uuid";

// Access Control
import { isAdminField } from "../access/isAdmin";
import { isWriter } from "../access/isWriter";
import { isAdminOrAuthor } from "../access/isAdminOrAuthor";
import { isPublished } from "../access/isPublished";

const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: isWriter,
    read: isPublished,
    // read: () => true,
    update: isAdminOrAuthor,
    delete: isAdminOrAuthor,
  },
  versions: {
    drafts: true,
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
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      label: "Author",
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
      name: "category",
      label: "Category",
      type: "radio",
      required: true,
      options: [
        {
          label: "News",
          value: "news",
        },
        {
          label: "Features",
          value: "features",
        },
        {
          label: "Kultura",
          value: "kultura",
        },
        {
          label: "Opinion",
          value: "opinion",
        },
      ],
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
      editor: slateEditor({
        admin: {
          elements: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "ul",
            "ol",
            "indent",
            "link",
            "relationship",
            "textAlign",
          ],
        },
      }),
    },
    {
      name: "top-article",
      label: "Top Article",
      type: "checkbox",
      defaultValue: false,
      admin: {
        condition: (data, siblingData, { user }) => {
          return user.role === "admin";
        },
      },
    },
    {
      name: "include-featured-photo",
      label: "Include Featured Photo?",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "featured-photo",
      required: true,
      admin: {
        condition: (data) => {
          return data["include-featured-photo"];
        },
      },
    },
    {
      name: "tags",
      label: "Tags",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Politics",
          value: "politics",
        },
        {
          label: "Tech",
          value: "tech",
        },
        {
          label: "Entertainment",
          value: "entertainment",
        },
        {
          label: "Sports",
          value: "sports",
        },
      ],
      admin: {
        isClearable: true,
      },
    },
  ],
};

export default Articles;
