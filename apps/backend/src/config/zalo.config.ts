import { registerAs } from '@nestjs/config';

export default registerAs('zalo', () => ({
  secret: process.env.ZALO_SECRET_KEY,
  appId: process.env.ZALO_APP_ID,
}));
