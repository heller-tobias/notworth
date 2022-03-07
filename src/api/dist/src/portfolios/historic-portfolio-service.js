"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricPortfolioService = void 0;
const api_definition_1 = require("../helper/api-definition");
class HistoricPortfolioService {
  constructor() {}
  init() {
    return __awaiter(this, void 0, void 0, function* () {});
  }
  calculateHistoricValue(positions) {
    let newestDate = this.getNewestDate(positions);
    let lastDate = this.getLastDate(positions);
    let dateList = this.getDates(lastDate, newestDate).reverse();
    let historicValues = [];
    for (const date of dateList) {
      historicValues.push(this.getValueOfPositionsAtDate(positions, date));
    }
    return historicValues;
  }
  getNewestDate(positions) {
    return new Date();
  }
  getLastDate(positions) {
    let lastDate = new Date();
    for (const position of positions) {
      if (position[api_definition_1.PayloadKey.VALUES].length > 0) {
        const currentDate = new Date(
          position[api_definition_1.PayloadKey.VALUES][
            position[api_definition_1.PayloadKey.VALUES].length - 1
          ].date
        );
        if (currentDate < lastDate) {
          lastDate = currentDate;
        }
      }
    }
    return lastDate;
  }
  getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = this.addDays(currentDate, 1);
    }
    return dateArray;
  }
  getValueOfPositionsAtDate(positions, date) {
    const valueObject = {};
    let totalValue = 0;
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
    valueObject[api_definition_1.PayloadKey.TOTAL_VALUE] = totalValue;
    valueObject[api_definition_1.PayloadKey.DATE] = this.toIsoDateString(date);
    return valueObject;
  }
  addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }
  getMaxDate() {
    return new Date(-8640000000000000);
  }
  toIsoDateString(date) {
    return date.toISOString().substring(0, date.toISOString().indexOf("T"));
  }
}
exports.HistoricPortfolioService = HistoricPortfolioService;
//# sourceMappingURL=historic-portfolio-service.js.map
