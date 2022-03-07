import { param } from "express-validator";
import { NotworthDatabase } from "../db/notworth-database";
import { PortfolioService } from "../portfolios/portfolio-service";
import { PositionService } from "../positions/position-service";
import { PositionValue } from "./position-value";
const { body, validationResult } = require("express-validator/check");

class ValueService {
  db: NotworthDatabase;
  portfolioService: PortfolioService;
  positionService: PositionService;
  VALUES: string = "values";

  constructor(
    db: NotworthDatabase,
    portfolioService: PortfolioService,
    positionService: PositionService
  ) {
    this.db = db;
    this.portfolioService = portfolioService;
    this.positionService = positionService;
  }

  async init() {
    this.db.init();
  }

  validate(method) {
    switch (method) {
      case "createValue": {
        return [
          body("value", "value doesnt exist")
            .exists()
            .custom((value) => this.isValueNumberGreaterEqualZero(value)),
          body("date")
            .exists()
            .isISO8601()
            .isDate()
            .custom((value) => this.isDateNotInTheFuture(value)),
          param("portfolioId", "portfolio does not exist")
            .exists()
            .isString()
            .bail()
            .custom((value, { req }) =>
              this.portfolioService.portfolioExists(value, req.body.userId, {
                req,
              })
            ),
          param("positionId", "position does not exist")
            .exists()
            .isString()
            .bail()
            .custom((value, { req }) =>
              this.positionService.positionExists(value, req.body.userId, {
                req,
              })
            ),
        ];
      }
      case "getValues": {
        return [
          param("portfolioId", "portfolio does not exist")
            .exists()
            .isString()
            .bail()
            .custom((value, { req }) =>
              this.portfolioService.portfolioExists(value, req.body.userId, {
                req,
              })
            ),
          param("positionId", "position does not exist")
            .exists()
            .isString()
            .bail()
            .custom((value, { req }) =>
              this.positionService.positionExists(value, req.body.userId, {
                req,
              })
            ),
        ];
      }
    }
  }

  isValueNumberGreaterEqualZero = async (value) => {
    if (!(typeof value == "number")) {
      throw new Error("Value should be a number!");
    }
    if (value < 0) {
      throw new Error("Value should be positive!");
    }
    return true;
  };

  isDateNotInTheFuture = async (value) => {
    let enteredDate = new Date(value);
    let todaysDate = new Date();
    if (enteredDate > todaysDate) {
      throw new Error("Date should not be in the future!");
    }
    return true;
  };

  createValue = async (req: any, res: any, next: any) => {
    try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const { value, date, userId } = req.body;

      const positionValue: PositionValue = {
        id: "",
        value: value,
        date: date,
        portfolioId: req.params.portfolioId,
        positionId: req.params.positionId,
      };
      res.json(await this.addValue(userId, positionValue));
    } catch (err) {
      return next(err);
    }
  };

  getValues = async (req: any, res: any, next: any) => {
    try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const { userId } = req.body;
      const portfolioId = req.params.portfolioId;
      const positionId = req.params.positionId;
      res.json(await this.db.getValues(userId, portfolioId, positionId));
    } catch (err) {
      return next(err);
    }
  };

  async addValue(userId: string, positionValue: PositionValue) {
    return this.db.addValue(userId, positionValue);
  }
}

export { ValueService };
