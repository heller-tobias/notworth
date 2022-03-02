import { json } from "express";
import { NotworthDatabase } from "../db/notworth-database";
import { Portfolio } from "./portfolio";
const { body, validationResult } = require('express-validator/check')
import { CategoryService } from "../categories/category-service";
import { PayloadKey } from "../helper/api-definition";
import { HistoricPortfolioService } from "./historic-portfolio-service";

class PortfolioService {
    db: NotworthDatabase;
    historicPortfolioService: HistoricPortfolioService;

    constructor(db: NotworthDatabase) {
        this.db = db;
        this.historicPortfolioService = new HistoricPortfolioService();
    }

    async init() {
        this.db.init();
    }

    validate(method) {
        switch (method) {
            case 'createPortfolio': {
                return [
                    body('name', 'name doesnt exist').exists().not().isEmpty(),
                    body('description').optional().isString(),
                ]
            }
        }
    }

    createPortfolio = async (req: any, res: any, next: any) => {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                return;
            }

            const { name, description, userId } = req.body

            const portfolio: Portfolio = { id: "", name: name, description: description }
            res.json(await this.addPortfolio(userId, portfolio));
        } catch (err) {
            return next(err)
        }
    }

    portfolioExists = async (value, userId, { req }) => {
        if (await this.getPortfolioById(userId, req.params.portfolioId)) {
            console.log("resolve portfolioExists");
            return Promise.resolve();
        }
        else {
            console.log("reject");
            return Promise.reject();
        }
    }

    async getPortfolios(userId: string) {
        const result = await this.db.getPortfolios(userId);
        if (!result) {
            return null;
        }
        else if (!result.length) {
            return result;
        }
        const returnValue = [];
        for (var portfolio of result) {
            portfolio[PayloadKey.POSITIONS] = await this.getPositionsWithValuesById(userId, portfolio["id"]);
            portfolio[PayloadKey.CURRENT_VALUE] = await this.calculateTotalValue(portfolio[PayloadKey.POSITIONS]);
            portfolio[PayloadKey.HISTORIC_VALUE] = await this.historicPortfolioService.calculateHistoricValue(portfolio[PayloadKey.POSITIONS]);
            returnValue.push(portfolio);
        }
        return returnValue;
    }

    async getPortfolioById(userId: string, portfolioId: string) {
        const result = await this.db.getPortfolioById(userId, portfolioId);
        if (!result) {
            return null;
        }

        result[PayloadKey.POSITIONS] = await this.getPositionsWithValuesById(userId, result["id"]);
        result[PayloadKey.CURRENT_VALUE] = await this.calculateTotalValue(result[PayloadKey.POSITIONS]);
        result[PayloadKey.HISTORIC_VALUE] = await this.historicPortfolioService.calculateHistoricValue(result[PayloadKey.POSITIONS]);

        return result;
    }

    private async getPositionsWithValuesById(userId: string, portfolioId: string) {
        const positions = await this.db.getPositions(userId, portfolioId);
        const returnPositions = [];
        for (const position of positions) {
            position[PayloadKey.VALUES] = await this.db.getValues(userId, portfolioId, position["id"]);
            returnPositions.push(position);
        }
        return returnPositions;
    }

    private async calculateTotalValue(positions: any) {
        let minDate: Date = new Date()
        let maxDate: Date = this.getMaxDate();
        let totalValueObject: Object = {};
        let totalValue: number = 0

        for (const position of positions) {
            if (position.values.length) {
                totalValue += position.values[0].value;
                const currentDate: Date = new Date(position.values[0].date)
                if (currentDate < minDate) {
                    minDate = currentDate
                }
                if (currentDate > maxDate) {
                    maxDate = currentDate
                }
            }
        }

        totalValueObject[PayloadKey.VALUE] = totalValue

        if (maxDate.getTime() === this.getMaxDate().getTime()) {
            totalValueObject[PayloadKey.MIN_DATE] = this.toIsoDateString(new Date());
            totalValueObject[PayloadKey.MAX_DATE] = this.toIsoDateString(new Date());
        }
        else {
            totalValueObject[PayloadKey.MIN_DATE] = this.toIsoDateString(minDate)
            totalValueObject[PayloadKey.MAX_DATE] = this.toIsoDateString(maxDate)
        }

        return totalValueObject;
    }

    private getMaxDate(): Date {
        return new Date(-8640000000000000);
    }

    private toIsoDateString(date: Date): string{
        return date.toISOString().substring(0, date.toISOString().indexOf('T'));
    }

    async addPortfolio(userId: string, portfolio: Portfolio) {
        return this.db.addPortfolio(userId, portfolio);
    }
}

export { PortfolioService }