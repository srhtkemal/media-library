import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Media, MediaDocument } from './schemas/media.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  private uploadDir: string;

  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
    private configService: ConfigService,
  ) {
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR') || './uploads';
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File, userId: string): Promise<MediaDocument> {
    if (file.mimetype !== 'image/jpeg') {
      throw new BadRequestException('only jpeg files are allowed');
    }

    const maxSize = this.configService.get<number>('MAX_FILE_SIZE') || 5242880;
    if (file.size > maxSize) {
      throw new BadRequestException('file size exceeds 5MB limit');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const media = new this.mediaModel({
      ownerId: new Types.ObjectId(userId),
      fileName: file.originalname,
      filePath,
      mimeType: file.mimetype,
      size: file.size,
      allowedUserIds: [],
    });

    return media.save();
  }

  async findById(id: string): Promise<MediaDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.mediaModel.findById(id).exec();
  }

  async findByOwner(userId: string): Promise<MediaDocument[]> {
    return this.mediaModel.find({ ownerId: new Types.ObjectId(userId) }).exec();
  }

  async hasAccess(mediaId: string, userId: string): Promise<boolean> {
    const media = await this.findById(mediaId);
    if (!media) return false;

    const userObjectId = new Types.ObjectId(userId);
    return (
      media.ownerId.equals(userObjectId) ||
      media.allowedUserIds.some((id) => id.equals(userObjectId))
    );
  }

  async isOwner(mediaId: string, userId: string): Promise<boolean> {
    const media = await this.findById(mediaId);
    if (!media) return false;
    return media.ownerId.equals(new Types.ObjectId(userId));
  }

  async addPermission(mediaId: string, userId: string): Promise<MediaDocument> {
    const media = await this.mediaModel.findByIdAndUpdate(
      mediaId,
      { $addToSet: { allowedUserIds: new Types.ObjectId(userId) } },
      { new: true },
    );
    
    if (!media) {
      throw new NotFoundException('media not found');
    }
    
    return media;
  }

  async removePermission(mediaId: string, userId: string): Promise<MediaDocument> {
    const media = await this.mediaModel.findByIdAndUpdate(
      mediaId,
      { $pull: { allowedUserIds: new Types.ObjectId(userId) } },
      { new: true },
    );
    
    if (!media) {
      throw new NotFoundException('media not found');
    }
    
    return media;
  }

  async delete(mediaId: string): Promise<void> {
    const media = await this.findById(mediaId);
    if (media && fs.existsSync(media.filePath)) {
      fs.unlinkSync(media.filePath);
    }
    await this.mediaModel.findByIdAndDelete(mediaId);
  }

  getFileStream(media: MediaDocument): fs.ReadStream {
    if (!fs.existsSync(media.filePath)) {
      throw new NotFoundException('file not found on disk');
    }
    return fs.createReadStream(media.filePath);
  }
}