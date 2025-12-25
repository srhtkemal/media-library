import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Body,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MediaAccessGuard } from './guards/media-access.guard';
import { MediaOwnerGuard } from './guards/media-owner.guard';
import { MediaService } from './media.service';
import { PermissionDto } from './dto/permission.dto';
import {
  MediaResponseDto,
  PermissionResponseDto,
  DeleteResponseDto,
} from './dto/media-response.dto';

@ApiTags('media')
@ApiBearerAuth('JWT-auth')
@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a JPEG image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'JPEG image file (max 5MB)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully',
    type: MediaResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async upload(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.mediaService.upload(file, req.user.userId);
  }

  @Get('my')
  @ApiOperation({
    summary: 'get all media owned by current user',
    description:
      'returns a list of all media files uploaded by the authenticated user ,no parameters required user is identified by JWT token',
  })
  @ApiResponse({
    status: 200,
    description: 'list of user media',
    type: [MediaResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyMedia(@Request() req) {
    return this.mediaService.findByOwner(req.user.userId);
  }

  @Get(':id')
  @UseGuards(MediaAccessGuard)
  @ApiOperation({ summary: 'get media metadata by id' })
  @ApiParam({
    name: 'id',
    description: 'media ID  => (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Media metadata',
    type: MediaResponseDto,
  })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 403, description: 'access denied' })
  @ApiResponse({ status: 404, description: 'media not found' })
  async getById(@Request() req) {
    return req.media;
  }

  @Get(':id/download')
  @UseGuards(MediaAccessGuard)
  @ApiOperation({ summary: 'download media file' })
  @ApiParam({
    name: 'id',
    description: 'media ID  => (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'file stream (JPEG image)',
    content: { 'image/jpeg': {} },
  })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 403, description: 'access denied' })
  @ApiResponse({ status: 404, description: 'media not found' })
  async download(@Request() req, @Res({ passthrough: true }) res: Response) {
    const media = req.media;
    res.set({
      'Content-Type': media.mimeType,
      'Content-Disposition': `attachment; filename="${media.fileName}"`,
    });
    const stream = this.mediaService.getFileStream(media);
    return new StreamableFile(stream);
  }

  @Delete(':id')
  @UseGuards(MediaOwnerGuard)
  @ApiOperation({ summary: 'delete media (owner only)' })
  @ApiParam({
    name: 'id',
    description: 'media ID  => (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'deleted successfully',
    type: DeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 403, description: 'only owner can delete' })
  @ApiResponse({ status: 404, description: 'media not found' })
  async delete(@Param('id') id: string) {
    await this.mediaService.delete(id);
    return { message: 'deleted successfully' };
  }

  @Get(':id/permissions')
  @UseGuards(MediaOwnerGuard)
  @ApiOperation({ summary: 'get permissions list (owner only)' })
  @ApiParam({
    name: 'id',
    description: 'media ID  => (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'permissions list',
    type: PermissionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 403, description: 'only owner can view permissions' })
  @ApiResponse({ status: 404, description: 'media not found' })
  async getPermissions(@Request() req) {
    return { allowedUserIds: req.media.allowedUserIds };
  }

  @Post(':id/permissions')
  @UseGuards(MediaOwnerGuard)
  @ApiOperation({ summary: 'add or remove permission (owner only)' })
  @ApiParam({
    name: 'id',
    description: 'media ID  => (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'permission updated',
    type: MediaResponseDto,
  })
  @ApiResponse({ status: 400, description: 'invalid action' })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'only owner can manage permissions',
  })
  @ApiResponse({ status: 404, description: 'media not found' })
  async updatePermission(
    @Param('id') id: string,
    @Body() permissionDto: PermissionDto,
  ) {
    if (permissionDto.action === 'add') {
      return this.mediaService.addPermission(id, permissionDto.userId);
    } else {
      return this.mediaService.removePermission(id, permissionDto.userId);
    }
  }
}