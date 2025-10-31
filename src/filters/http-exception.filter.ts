import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { WinstonLogger } from "../logger/winston-logger.service";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new WinstonLogger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number;
    let message: string;
    let data: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === "string"
          ? res
          : res && (res as any).message
            ? (res as any).message
            : "Unknown error";
      data = res && (res as any).error ? (res as any).error : null;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (exception instanceof Error) {
        message = exception.message;
        data = { name: exception.name, stack: exception.stack };
      } else {
        message = JSON.stringify(exception);
      }
    }

    // 📝 写入日志
    this.logger.error(
      `HTTP ${request.method} ${request.url} >> code: ${status}, message: ${message}`,
      data?.stack ?? ""
    );

    response.status(status).json({
      code: status >= 400 ? 500 : 200,
      message,
      data,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
