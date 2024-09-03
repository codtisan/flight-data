import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthResponseDto } from './typings/healthcheck';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): HealthResponseDto {
    return this.appService.checkHealth();
  }
}
