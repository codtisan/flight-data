import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class WebCrawlerService {
    public async crawlFlightData(): Promise<any> {
        const browser = await puppeteer.launch({ headless: false});
        const page = await browser.newPage();
        
        await page.goto('https://www.google.com/travel/flights?gl=HK&hl=en');
        
        await page.setViewport({width: 1080, height: 1024});
        
        await browser.close();
    }
}
