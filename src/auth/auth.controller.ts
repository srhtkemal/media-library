import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import {
  TokenResponseDto,
  RegisterResponseDto,
} from './dto/token-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'register a new user' })
  @ApiResponse({
    status: 201,
    description: 'user registered successfully',
    type: RegisterResponseDto,
  })
  @ApiResponse({ status: 400, description: 'validation error' })
  @ApiResponse({ status: 409, description: 'email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    const tokens = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );
    return {
      message: 'user registered successfully',
      ...tokens,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login user' })
  @ApiResponse({
    status: 200,
    description: 'login successful',
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 400, description: 'validation error' })
  @ApiResponse({ status: 401, description: 'invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'tokens refreshed',
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 400, description: 'validation error' })
  @ApiResponse({ status: 401, description: 'invalid refresh token' })
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}