import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'serhatkemal@gmail.com', description: 'user email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Passw0rd!', description: 'user password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
