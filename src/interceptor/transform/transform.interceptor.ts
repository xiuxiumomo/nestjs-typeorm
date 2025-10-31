import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { WinstonLogger } from "../../logger/winston-logger.service";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new WinstonLogger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      map((data) => {
        this.logger.log(`HTTP ${method} ${url} >> SUCCESS`);
        return {
          code: 200,
          message: "success",
          data: data ?? null,
        };
      }),
      tap({
        error: (err) => {
          this.logger.error(`HTTP ${method} ${url} >> FAILED`, err.stack ?? "");
        },
      })
    );
  }
}
