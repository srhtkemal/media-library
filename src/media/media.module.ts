import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { memoryStorage } from 'multer';
import { Media, MediaSchema } from './schemas/media.schema';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaAccessGuard } from './guards/media-access.guard';
import { MediaOwnerGuard } from './guards/media-owner.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    MulterModule.register({ storage: memoryStorage() }),
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [MediaController],
  providers: [MediaService, MediaAccessGuard, MediaOwnerGuard],
})
export class MediaModule {}