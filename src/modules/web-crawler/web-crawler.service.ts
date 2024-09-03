import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { TravelDestinations } from 'src/constants/destinations';
import { WebElement } from 'src/constants/web-elements';
import 'dotenv/config';

@Injectable()
export class WebCrawlerService {
  public async crawlFlightData(): Promise<any> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(
      `https://www.google.com/travel/flights?${TravelDestinations.Okinawa}`,
    );

    await page.setViewport({ width: 1080, height: 1024 });

    await page.click(WebElement.DepartureButton);

    await page.waitForSelector(WebElement.MonthData);
  }
}
