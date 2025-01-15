import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){}

    intercept(context: ExecutionContext, handle: CallHandler): Observable<any> {

    return handle.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, { 
            excludeExtraneousValues: true
        });
      }), 
          
    );
  }
}
