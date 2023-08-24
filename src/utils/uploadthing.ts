import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/pages/server/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
generateComponents<OurFileRouter>();
