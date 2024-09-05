import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { TravelDestinations } from 'src/constants/destinations';
import { WebElement } from 'src/constants/web-elements';
import 'dotenv/config';
import { FlightResponseDto, FlightPayloadDto, FlightOptionDto } from 'src/typings/flight-data';
import { Time } from 'src/utils/time';
import { findNLowestWithIndices } from 'src/utils/number';

const chromeOptions = ['--no-sandbox', '--single-process', '--disable-setuid-sandbox', '--no-zygote'];
@Injectable()
export class WebCrawlerService {
  private readonly logger = new Logger(WebCrawlerService.name);

  public async crawlFlightData(selectedOptions: FlightOptionDto): Promise<FlightResponseDto> {
    try {
      const headless = process.env.HEADLESS;
      const browser = await puppeteer.launch({
        headless: headless === 'false' ? false : true,
        args: chromeOptions,
        executablePath:
          process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
      });
      const page = await browser.newPage();
      this.logger.log('Successfully Launch browser');

      let destination: string = '';
      for (const place in TravelDestinations) {
        if (selectedOptions.destination === place) {
          destination = TravelDestinations[place];
        }
      }

      await page.goto(`https://www.google.com/travel/flights?${destination}`);
      this.logger.log('Successfully go to google flights website');

      await page.setViewport({ width: 1080, height: 1024 });

      await page.click(WebElement.DepartureButton);

      await page.waitForSelector(WebElement.DayPrice);

      const data = await page.evaluate(() => {
        const elements = document.querySelectorAll('div[aria-label*="Hong Kong dollars"]');
        return Array.from(elements).map((el) => el.textContent);
      });
      this.logger.log('Successfully crawl the flight price data');

      const processedData = await this.preprocessFlightData(data, selectedOptions.numberOfCheaper);
      this.logger.log('Successfully preprocess the flight data');

      await browser.close();

      return {
        status: 'success',
        message: 'Successfully extract flight data',
        payload: processedData,
      };
    } catch (err) {
      this.logger.error(err.message);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async preprocessFlightData(data: string[], numberOfCheaper: number = 5): Promise<FlightPayloadDto[]> {
    const prices = data.map((priceString) => {
      return parseInt(priceString.replace(/[^\d]/g, ''), 10);
    });
    const nCheaper = findNLowestWithIndices(prices, numberOfCheaper);
    const numberOfRestDays = Time.getRestDayNumberInMonth();

    const processedData = nCheaper.map((cheaper) => {
      const [currentMonth, nextMonth] = Time.getCurrentAndNextMonth();
      const priceString = cheaper.price.toString();
      if (cheaper.index <= numberOfRestDays) {
        return {
          price: priceString,
          date: `${currentMonth} ${cheaper.index}`,
        };
      } else {
        return {
          price: priceString,
          date: `${nextMonth} ${cheaper.index - numberOfRestDays + 1}`,
        };
      }
    });

    return processedData;
  }
}
