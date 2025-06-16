import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { Readable } from 'stream';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

interface UploadResult {
  url: string;
  publicId: string;
}

const uploadToCloudinary = (
  buffer: Buffer,
  options: UploadApiOptions
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed'));
        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

const uploadImage = async (buffer: Buffer): Promise<UploadResult> => {
  return uploadToCloudinary(buffer, {
    folder: 'company_images',
    resource_type: 'image',
    allowed_formats: ['jpg', 'png'],
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto:best' }
    ]
  });
};


const uploadResume = async (buffer: Buffer): Promise<UploadResult> => {
  return uploadToCloudinary(buffer, {
    folder: 'job_resumes',
    resource_type: 'raw',
    allowed_formats: ['pdf']
  });
};

export {
    cloudinary,
    uploadImage,
    uploadResume
}