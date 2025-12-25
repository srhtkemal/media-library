import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { MediaService } from '../media.service';

@Injectable()
export class MediaAccessGuard implements CanActivate {
  constructor(private mediaService: MediaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const mediaId = request.params.id;

    const media = await this.mediaService.findById(mediaId);
    if (!media) {
      throw new NotFoundException('media not found');
    }

    const hasAccess = await this.mediaService.hasAccess(mediaId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('access denied');
    }

    request.media = media;
    return true;
  }
}