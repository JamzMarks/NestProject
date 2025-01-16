import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export class SerializeInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>){}

    intercept(context: ExecutionContext, handle: CallHandler): Observable<any> {
    return handle.handle().pipe(
      map((data: T) => {
        return plainToInstance(this.dto, data, { 
            excludeExtraneousValues: true
        });
      }), 
          
    );
  }
}
