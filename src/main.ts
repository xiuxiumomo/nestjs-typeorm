import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
//接口统一格式
import { TransformInterceptor } from "./interceptor/transform/transform.interceptor";
//异常的时候统一格式

import { AllExceptionsFilter } from "./filters/http-exception.filter";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(7777);
}
bootstrap();
