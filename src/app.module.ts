import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebCrawlerController } from './modules/web-crawler/web-crawler.controller';
import { WebCrawlerService } from './modules/web-crawler/web-crawler.service';
import { WebCrawlerModule } from './modules/web-crawler/web-crawler.module';

@Module({
  imports: [WebCrawlerModule],
  controllers: [AppController, WebCrawlerController],
  providers: [AppService, WebCrawlerService],
})
export class AppModule {}
