import { Module, Global, DynamicModule } from '@nestjs/common';
import { ApmService } from './apm.service';
import { ApmInterceptor } from './apm.interceptor';

@Global()
@Module({})
export class ApmModule {
  static forRoot(service: string): DynamicModule {
    const apmProvider = {
      provide: ApmService,
      useFactory: () => {
        const apm = new ApmService(service);
        apm.start(); // فعال‌سازی ارسال خودکار
        return apm;
      }
    };

    return {
      module: ApmModule,
      providers: [apmProvider, ApmInterceptor],
      exports: [ApmService, ApmInterceptor]
    };
  }
}
