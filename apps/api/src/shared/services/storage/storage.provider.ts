import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../../config';
import { logger } from '../../utils/logger';

// Standard file input type for uploading
export interface UploadFileInput {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

export abstract class StorageProvider {
  abstract uploadFile(file: UploadFileInput, folder: string): Promise<string>;
  abstract deleteFile(fileUrl: string): Promise<void>;
}

export class LocalStorageProvider extends StorageProvider {
  private uploadDir: string;

  constructor() {
    super();
    // Resolve upload directory to apps/api/uploads
    this.uploadDir = path.resolve(__dirname, '../../../../uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: UploadFileInput, folder: string): Promise<string> {
    const ext = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${ext}`;
    const targetDir = path.join(this.uploadDir, folder);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, uniqueFilename);
    await fs.promises.writeFile(filePath, file.buffer);

    logger.info(`File uploaded locally: ${folder}/${uniqueFilename}`);

    // Return the accessible public URL path
    return `${config.frontendUrl.replace(':3000', ':5000')}/uploads/${folder}/${uniqueFilename}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract local path from URL
      const parts = fileUrl.split('/uploads/');
      if (parts.length < 2) return;
      
      const relativePath = parts[1];
      const filePath = path.join(this.uploadDir, relativePath);

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        logger.info(`Local file deleted: ${relativePath}`);
      }
    } catch (err) {
      logger.error('Failed to delete local file', { err, fileUrl });
    }
  }
}

export class S3StorageProvider extends StorageProvider {
  async uploadFile(file: UploadFileInput, folder: string): Promise<string> {
    // Check for credentials - if missing, log warning and use local fallback
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      logger.warn('AWS S3 credentials missing. Falling back to Local Storage Provider.');
      const fallback = new LocalStorageProvider();
      return fallback.uploadFile(file, folder);
    }
    
    logger.info(`[Production] Uploading file to AWS S3 in bucket folder: ${folder}/${file.originalname}`);
    // Simulate S3 upload and return a mock S3 URL
    return `https://${process.env.AWS_S3_BUCKET || 'vyom-bucket'}.s3.amazonaws.com/${folder}/${uuidv4()}-${file.originalname}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    logger.info(`[Production] Deleting file from AWS S3: ${fileUrl}`);
  }
}

// Factory to select the storage provider based on environment variables
let selectedProvider: StorageProvider | null = null;

export function getStorageProvider(): StorageProvider {
  if (selectedProvider) return selectedProvider;

  const providerType = process.env.STORAGE_PROVIDER || 'local';
  
  if (providerType === 's3') {
    selectedProvider = new S3StorageProvider();
  } else {
    selectedProvider = new LocalStorageProvider();
  }

  logger.info(`Storage Provider initialized: ${selectedProvider.constructor.name}`);
  return selectedProvider;
}
