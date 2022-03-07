"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const { body, validationResult } = require('express-validator/check');
const api_definition_1 = require("../helper/api-definition");
const historic_portfolio_service_1 = require("./historic-portfolio-service");
class PortfolioService {
    constructor(db) {
        this.createPortfolio = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
                if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                    return;
                }
                const { name, description, userId } = req.body;
                const portfolio = { id: "", name: name, description: description };
                res.json(yield this.addPortfolio(userId, portfolio));
            }
            catch (err) {
                return next(err);
            }
        });
        this.portfolioExists = (value, userId, { req }) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.getPortfolioById(userId, req.params.portfolioId)) {
                console.log("resolve portfolioExists");
                return Promise.resolve();
            }
            else {
                console.log("reject");
                return Promise.reject();
            }
        });
        this.db = db;
        this.historicPortfolioService = new historic_portfolio_service_1.HistoricPortfolioService();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.init();
        });
    }
    validate(method) {
        switch (method) {
            case 'createPortfolio': {
                return [
                    body('name', 'name doesnt exist').exists().not().isEmpty(),
                    body('description').optional().isString(),
                ];
            }
        }
    }
    getPortfolios(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.getPortfolios(userId);
            if (!result) {
                return null;
            }
            else if (!result.length) {
                return result;
            }
            const returnValue = [];
            for (var portfolio of result) {
                portfolio[api_definition_1.PayloadKey.POSITIONS] = yield this.getPositionsWithValuesById(userId, portfolio["id"]);
                portfolio[api_definition_1.PayloadKey.CURRENT_VALUE] = yield this.calculateTotalValue(portfolio[api_definition_1.PayloadKey.POSITIONS]);
                portfolio[api_definition_1.PayloadKey.HISTORIC_VALUE] = yield this.historicPortfolioService.calculateHistoricValue(portfolio[api_definition_1.PayloadKey.POSITIONS]);
                returnValue.push(portfolio);
            }
            return returnValue;
        });
    }
    getPortfolioById(userId, portfolioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.getPortfolioById(userId, portfolioId);
            if (!result) {
                return null;
            }
            result[api_definition_1.PayloadKey.POSITIONS] = yield this.getPositionsWithValuesById(userId, result["id"]);
            result[api_definition_1.PayloadKey.CURRENT_VALUE] = yield this.calculateTotalValue(result[api_definition_1.PayloadKey.POSITIONS]);
            result[api_definition_1.PayloadKey.HISTORIC_VALUE] = yield this.historicPortfolioService.calculateHistoricValue(result[api_definition_1.PayloadKey.POSITIONS]);
            return result;
        });
    }
    getPositionsWithValuesById(userId, portfolioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const positions = yield this.db.getPositions(userId, portfolioId);
            const returnPositions = [];
            for (const position of positions) {
                position[api_definition_1.PayloadKey.VALUES] = yield this.db.getValues(userId, portfolioId, position["id"]);
                returnPositions.push(position);
            }
            return returnPositions;
        });
    }
    calculateTotalValue(positions) {
        return __awaiter(this, void 0, void 0, function* () {
            let minDate = new Date();
            let maxDate = this.getMaxDate();
            let totalValueObject = {};
            let totalValue = 0;
            for (const position of positions) {
                if (position.values.length) {
                    totalValue += position.values[0].value;
                    const currentDate = new Date(position.values[0].date);
                    if (currentDate < minDate) {
                        minDate = currentDate;
                    }
                    if (currentDate > maxDate) {
                        maxDate = currentDate;
                    }
                }
            }
            totalValueObject[api_definition_1.PayloadKey.VALUE] = totalValue;
            if (maxDate.getTime() === this.getMaxDate().getTime()) {
                totalValueObject[api_definition_1.PayloadKey.MIN_DATE] = this.toIsoDateString(new Date());
                totalValueObject[api_definition_1.PayloadKey.MAX_DATE] = this.toIsoDateString(new Date());
            }
            else {
                totalValueObject[api_definition_1.PayloadKey.MIN_DATE] = this.toIsoDateString(minDate);
                totalValueObject[api_definition_1.PayloadKey.MAX_DATE] = this.toIsoDateString(maxDate);
            }
            return totalValueObject;
        });
    }
    getMaxDate() {
        return new Date(-8640000000000000);
    }
    toIsoDateString(date) {
        return date.toISOString().substring(0, date.toISOString().indexOf('T'));
    }
    addPortfolio(userId, portfolio) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.addPortfolio(userId, portfolio);
        });
    }
}
exports.PortfolioService = PortfolioService;
//# sourceMappingURL=portfolio-service.js.map