import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { User } from '../user/entities/user.entity';
import { LoginWithEmailDto } from './dto/login-with-email.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginWithEmailDto,
  })
  @HttpCode(200)
  login(@Request() req) {
    return req.user;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  profile(@CurrentUser() user: User) {
    return user;
  }
}
