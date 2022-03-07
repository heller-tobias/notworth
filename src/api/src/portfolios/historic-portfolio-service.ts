import { PayloadKey } from "../helper/api-definition";
import { Position } from "../positions/position";

class HistoricPortfolioService {
  constructor() {}

  async init() {}

  public calculateHistoricValue(positions: any) {
    let newestDate: Date = this.getNewestDate(positions);
    let lastDate: Date = this.getLastDate(positions);
    let dateList: Array<Date> = this.getDates(lastDate, newestDate).reverse();

    let historicValues: Array<any> = [];
    for (const date of dateList) {
      historicValues.push(this.getValueOfPositionsAtDate(positions, date));
    }

    return historicValues;
  }

  private getNewestDate(positions: Array<Position>) {
    return new Date();
  }

  private getLastDate(positions: Array<Position>) {
    let lastDate = new Date();
    for (const position of positions) {
      if (position[PayloadKey.VALUES].length > 0) {
        const currentDate = new Date(
          position[PayloadKey.VALUES][
            position[PayloadKey.VALUES].length - 1
          ].date
        );
        if (currentDate < lastDate) {
          lastDate = currentDate;
        }
      }
    }
    return lastDate;
  }

  private getDates(startDate: Date, stopDate: Date) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = this.addDays(currentDate, 1);
    }
    return dateArray;
  }

  private getValueOfPositionsAtDate(positions: any, date: Date) {
    const valueObject: any = {};
    let totalValue: number = 0;

    for (const position of positions) {
      let positionValue = 0;
      for (var i = position.values.length - 1; i >= 0; i--) {
        if (new Date(position.values[i].date) > date) {
          break;
        }
        positionValue = position.values[i].value;
      }

      totalValue += positionValue;
    }

    valueObject[PayloadKey.TOTAL_VALUE] = totalValue;
    valueObject[PayloadKey.DATE] = this.toIsoDateString(date);
    return valueObject;
  }

  private addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  private getMaxDate(): Date {
    return new Date(-8640000000000000);
  }

  private toIsoDateString(date: Date): string {
    return date.toISOString().substring(0, date.toISOString().indexOf("T"));
  }
}

export { HistoricPortfolioService };
