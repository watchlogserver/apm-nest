import { Injectable } from '@nestjs/common';
import * as http from 'http';
import { URL } from 'url';
const agentUrl = "http://localhost:3774/apm/nest"
@Injectable()
export class ApmService {
  private metrics: any[] = [];
  public readonly serviceName: string;

  constructor(service: string) {
    this.serviceName = service;
  }

  record(metric: any): void {
    if (!metric || typeof metric !== 'object') return;
    this.metrics.push(metric);
  }

  flush(): any[] {
    const copy = [...this.metrics];
    this.metrics = [];
    return copy;
  }

  start(interval: number = 10000): void {
    const delay = Math.max(interval, 10000);

    setInterval(() => {
      try {
        const data = this.flush();
        if (Array.isArray(data) && data.length > 0) {
          this.send(data);
        }
      } catch (_) {}
    }, delay);
  }

  private send(data: any[]): void {
    try {
      const url = new URL(agentUrl);
      const payload = JSON.stringify({
        collected_at: new Date().toISOString(),
        metrics: data
      });

      const options = {
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname || '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        },
        timeout: 3000
      };

      const req = http.request(options, res => {
        if (res.statusCode && res.statusCode >= 400) {
          console.warn(`[Watchlog APM] Agent responded with status ${res.statusCode}`);
        }
        res.on('data', () => {});
      });

      req.on('error', () => {});
      req.write(payload);
      req.end();
    } catch (_) {
      // silent fail
    }
  }
}
