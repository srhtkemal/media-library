import {
  Controller,
  Get,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({
    status: 200,
    description: 'User info returned',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 404, description: 'user not found' })
  async getMe(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  }
}