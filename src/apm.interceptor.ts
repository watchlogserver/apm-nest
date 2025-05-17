import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import { performance } from 'perf_hooks';
  import { ApmService } from './apm.service';
  
  @Injectable()
  export class ApmInterceptor implements NestInterceptor {
    constructor(private readonly apmService: ApmService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const start = performance.now();
  
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
  
      return next.handle().pipe(
        tap(() => {
          const duration = performance.now() - start;
  
          const method = request?.method || 'UNKNOWN';
          const path = request?.route?.path || request?.url || 'UNKNOWN';
          const statusCode = response?.statusCode || 0;
          const memory = process.memoryUsage();
  
          this.apmService.record({
            type: 'request',
            service: this.apmService.serviceName,
            path,
            method,
            statusCode,
            duration: parseFloat(duration.toFixed(2)),
            timestamp: new Date().toISOString(),
            memory
          });
        })
      );
    }
  }
  