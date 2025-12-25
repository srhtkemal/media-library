import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class PermissionDto {
  @ApiProperty({ description: 'user id to add or removepermission' })
  @IsString()
  userId: string;

  @ApiProperty({ enum: ['add', 'remove'], description: 'action to perform' })
  @IsIn(['add', 'remove'])
  action: 'add' | 'remove';
}
