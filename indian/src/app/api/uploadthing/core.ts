import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "8MB" },
    blob: { maxFileSize: "8MB" }
  })
    .onUploadError(async ({ error, fileKey }) => {
      console.log(`[UploadThing] Upload failed for key ${fileKey}: ${error.message}`);
    })
    .onUploadComplete(async ({ file }) => {
      console.log(`[UploadThing] Upload completed. File URL: ${file.url}`);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
