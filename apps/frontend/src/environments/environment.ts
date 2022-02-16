export const environment = {
  production: false,
  zaloAppId: process.env.NX_ZALO_APP_ID || '513056836020745485',
  zaloCallbackURL:
    process.env.NX_ZALO_CALLBACK_URL ||
    'https://kma-news.herokuapp.com/auth/login/zalo',
};
