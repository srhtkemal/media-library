import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'serhatkemal@gmail.com', description: 'user email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Passw0rd!', description: 'user password' })
  @IsString()
  password: string;
}
