import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get(':id')
  public async getHello(@Param('id') id: string): Promise<string> {
    console.log('##### id');
    console.log(id);
    return this.appService.getHello();
  }

  @Post('hello')
  public async getHello2(@Param('id') id: string): Promise<string> {
    console.log('##### id');
    console.log(id);
    return this.appService.getHello();
  }
}
