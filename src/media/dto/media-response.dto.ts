import { ApiProperty } from '@nestjs/swagger';

export class MediaResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  ownerId: string;

  @ApiProperty({ example: 'photo.jpg' })
  fileName: string;

  @ApiProperty({ example: './uploads/1234567890-photo.jpg' })
  filePath: string;

  @ApiProperty({ example: 'image/jpeg' })
  mimeType: string;

  @ApiProperty({ example: 102400 })
  size: number;

  @ApiProperty({ example: [], type: [String] })
  allowedUserIds: string[];

  @ApiProperty({ example: '2025-12-24T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-24T10:00:00.000Z' })
  updatedAt: Date;
}

export class PermissionResponseDto {
  @ApiProperty({ example: ['507f1f77bcf86cd799439013'], type: [String] })
  allowedUserIds: string[];
}

export class DeleteResponseDto {
  @ApiProperty({ example: 'deleted successfully' })
  message: string;
}
