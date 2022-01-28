import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginWithEmailDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'adminpassword' })
  @IsString()
  password: string;
}
