import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './typings/healthcheck';
import { Time } from './utils/time';
@Injectable()
export class AppService {
  checkHealth(): HealthResponseDto {
    return {
      status: "success",
      message: "OK!",
      timestamp: Time.getCurrentTime()
    };
  }
}
