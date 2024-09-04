import { Controller, Post, Body } from '@nestjs/common';
import { WebCrawlerService } from './web-crawler.service';
import PQueue from 'p-queue';
import { FlightOptionDto } from 'src/typings/flight-data';

const queue = new PQueue({ concurrency: 10 });

@Controller('web-crawler')
export class WebCrawlerController {
  constructor(private readonly webCrawlerService: WebCrawlerService) {}

  @Post()
  async getFlightData(@Body() selectedOptions: FlightOptionDto): Promise<any> {
    return await queue.add(() =>
      this.webCrawlerService.crawlFlightData(selectedOptions),
    );
  }
}
