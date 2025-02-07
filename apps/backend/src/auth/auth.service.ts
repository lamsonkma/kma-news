import { ConflictException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/entities/user.entity';
import { TokenService } from '../token/token.service';
import { LoginResultInterface } from '../common/interfaces/login-result.interface';
import { ZaloService } from '@kma-news/zalo-auth';
import { RegisterDto } from './dto/register-dto';

// Function compare two number

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly zaloService: ZaloService
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return undefined;
    const { password: hashPassword, ...data } = user;
    if (this.userService.comparePassword(password, hashPassword)) return data;
    return undefined;
  }

  login(
    user: Pick<User, 'id' | 'email' | 'avatarURL' | 'name' | 'role'>
  ): LoginResultInterface {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    const [access_token] = this.tokenService.signAccessToken(payload);
    const [refresh_token, token_expiredTime] =
      this.tokenService.signRefreshToken(payload);
    // Access token
    return {
      access_token: access_token,
      expiredAt: token_expiredTime.toISOString(),
      refresh_token,
      user: {
        id: user.id,
        email: user.email,
        avatarURL: user.avatarURL,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    return this.login(user);
  }

  async refresh(refresh_token: string) {
    try {
      const { id, email } = this.tokenService.verifyRefreshToken(refresh_token);
      const user = await this.userService.findOne(id);
      if (user?.email !== email) throw new ForbiddenException('Token expired');
      const payload = {
        email: user.email,
        id: user.id,
        role: user.role,
      };
      const [access_token] = this.tokenService.signAccessToken(payload);
      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          avatarURL: user.avatarURL,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new ForbiddenException('Token expired');
    }
  }

  async loginByZalo(code: string) {
    const { access_token } =
      await this.zaloService.getTokenFromAuthorizationCode(code);
    const { id, name, picture } = await this.zaloService.getUserDataFromToken(
      access_token
    );
    const email = `${id}@zalo.com.vn`;
    const password = `password_${Date.now()}`;
    const existUser = await this.userService.findByEmail(email);
    if (existUser) return this.login(existUser);
    const user = await this.userService.create({
      email,
      password,
      name,
      role: UserRole.USER,
      avatarURL: picture?.data?.url,
    });
    return this.login(user);
  }
}
