import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { MediaService } from '../media.service';

@Injectable()
export class MediaOwnerGuard implements CanActivate {
  constructor(private mediaService: MediaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const mediaId = request.params.id;

    const media = await this.mediaService.findById(mediaId);
    if (!media) {
      throw new NotFoundException('media not found');
    }

    const isOwner = await this.mediaService.isOwner(mediaId, userId);
    if (!isOwner) {
      throw new ForbiddenException('only owner can perform this action');
    }

    request.media = media;
    return true;
  }
}