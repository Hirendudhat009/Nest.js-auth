import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { regiterDataDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'register a admin',
  })
  async register(@Body() registerData: regiterDataDto) {
    await this.authService.register(registerData);
    return { message: 'registered successfully' };
  }

  @Post('login')
  @ApiOperation({
    summary: 'login service',
  })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
