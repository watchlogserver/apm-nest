# @watchlog/apm-nest

APM integration for NestJS to report HTTP request metrics to [Watchlog](https://watchlog.io).

This package automatically captures route-level performance data and sends it to a Watchlog agent.

---

## 🚀 Features

- Collects: `method`, `path`, `statusCode`, `duration`, `timestamp`, and `memory`
- Sends metrics periodically to Watchlog agent
- Lightweight and dependency-free (uses Node.js core modules)
- Easy integration with any NestJS project

---

## 📦 Installation

```bash
npm install @watchlog/apm-nest
```

> Make sure your NestJS project already has:
>
> ```bash
> npm install @nestjs/common @nestjs/core rxjs reflect-metadata
> ```

---

## 🛠 Usage

### 1. Import `ApmModule` in `AppModule`

```ts
import { Module } from '@nestjs/common';
import { ApmModule } from '@watchlog/apm-nest';

@Module({
  imports: [
    ApmModule.forRoot('my-service-name')
  ]
})
export class AppModule {}
```

### 2. Register the interceptor globally in `main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApmInterceptor } from '@watchlog/apm-nest';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const interceptor = app.get(ApmInterceptor);
  app.useGlobalInterceptors(interceptor);
  await app.listen(3000);
}
bootstrap();
```

---

## 📤 What gets sent

Example metric sent to the Watchlog agent:

```json
{
  "type": "request",
  "service": "my-service-name",
  "path": "/users/:id",
  "method": "GET",
  "statusCode": 200,
  "duration": 132.45,
  "timestamp": "2025-05-17T10:34:22.000Z",
  "memory": {
    "rss": 30208000,
    "heapUsed": 14876000,
    "heapTotal": 19456000
  }
}
```

---

## 📄 License

MIT — &copy; Mohammadreza / Watchlog.io
