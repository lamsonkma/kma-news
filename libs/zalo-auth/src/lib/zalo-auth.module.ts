import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { ZaloService } from './zalo-auth.service';
export interface ZaloModuleOption {
  secret: string;
  appId: number;
}
@Module({})
export class ZaloModule {
  static register(options: ZaloModuleOption): DynamicModule {
    return {
      module: ZaloModule,
      imports: [
        HttpModule.register({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      ],
      providers: [
        ZaloService,
        {
          provide: 'ZALO_SECRET',
          useValue: options.secret,
        },
        {
          provide: 'ZALO_APPID',
          useValue: options.appId,
        },
      ],
      exports: [ZaloService],
    };
  }
}
