import { Controller, Post } from '@nestjs/common';
import { WebCrawlerService } from './web-crawler.service';
import PQueue from 'p-queue';

const queue = new PQueue({ concurrency: 10 });

@Controller('web-crawler')
export class WebCrawlerController {
  constructor(private readonly webCrawlerService: WebCrawlerService) {}

  @Post()
  async getHealth(): Promise<any> {
    return await queue.add(() => this.webCrawlerService.crawlFlightData());
  }
}
