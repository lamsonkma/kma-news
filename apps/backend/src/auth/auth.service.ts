import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return undefined;
    const { password: hashPassword, ...data } = user;
    if (this.userService.comparePassword(password, hashPassword)) return data;
    return undefined;
  }

  login(user: Pick<User, 'id' | 'email' | 'avatarURL' | 'name'>) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('jwt.access_token_secret'),
        expiresIn: this.configService.get<number>('jwt.access_token_ttl'),
      }),
      user: {
        id: user.id,
        email: user.email,
        avatarURL: user.avatarURL,
        name: user.name,
      },
    };
  }
}
