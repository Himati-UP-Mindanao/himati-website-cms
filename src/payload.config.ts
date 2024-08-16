import path from "path";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

import HimatiStaff from "./collections/HimatiStaff";
import Articles from "./collections/Articles";
import FeaturedPhoto from "./collections/FeaturedPhoto";
import ProfilePhoto from "./collections/ProfilePhoto";

const adapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET,
});

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_EXTERNAL_SERVER_URL,
  rateLimit: {
    trustProxy: true,
  },
  csrf: ["https://himati-cms-dev-6a8e9e0378a8.herokuapp.com"],
  admin: {
    user: HimatiStaff.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [HimatiStaff, Articles, FeaturedPhoto, ProfilePhoto],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    disable: true,
  },
  plugins: [
    cloudStorage({
      collections: {
        "featured-photo": {
          adapter: adapter,
          prefix: "featured-photo/images",
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            return `${process.env.CLOUDFRONT_URL}/${prefix}/${filename}`;
          },
        },
        "profile-photo": {
          adapter: adapter,
          prefix: "profile-photo",
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            return `${process.env.CLOUDFRONT_URL}/${prefix}/${filename}`;
          },
        },
      },
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
