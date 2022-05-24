import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('/test')
export class TestController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): string {
    return this.appService.getTest();
  }
}
