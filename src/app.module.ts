import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebCrawlerController } from './modules/web-crawler/web-crawler.controller';
import { WebCrawlerService } from './modules/web-crawler/web-crawler.service';
import { WebCrawlerModule } from './modules/web-crawler/web-crawler.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
@Module({
  imports: [WebCrawlerModule],
  controllers: [AppController, WebCrawlerController],
  providers: [AppService, WebCrawlerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
