import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ example: 'serhatkemal@gmail.com' })
  email: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  role: string;
}
