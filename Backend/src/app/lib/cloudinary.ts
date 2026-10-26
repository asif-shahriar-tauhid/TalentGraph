import { type UploadApiResponse, v2 as cloudinary } from "cloudinary";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadToCloudinary = (
  buffer: Buffer,
  folder = "uploads",
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Failed to upload image to Cloudinary"));
          }
          resolve(result);
        },
      )
      .end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};

export { cloudinary };
