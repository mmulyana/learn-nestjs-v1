import { Injectable } from '@nestjs/common';
import { v2 as cloundinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { config } from 'dotenv';
config();

cloundinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async UploadImageStream(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloundinary.uploader.upload_stream(
        {
          folder: 'articles',
          allowed_formats: ['jpg', 'png'],
        },
        (error, result: UploadApiResponse) => {
          console.log('error', error)
          if (error) return reject(error);
          return resolve(result.secure_url);
        },
      );
      const stream = streamifier.createReadStream(file.buffer);
      stream.pipe(uploadStream);
    });
  }
}
