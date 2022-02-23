import { json } from "express";
import { NotworthDatabase } from "../db/notworth-database";
import { Portfolio } from "./portfolio";
const { body, validationResult } = require('express-validator/check')
import { CategoryService } from "../categories/category-service";
import { PayloadKey } from "../helper/api-definition";

class PortfolioService {
    db: NotworthDatabase;

    constructor(db: NotworthDatabase) {
        this.db = db;
    }

    async init() {
        this.db.init();
    }

    validate(method) {
        switch (method) {
            case 'createPortfolio': {
                return [
                    body('name', 'name doesnt exist').exists(),
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
            portfolio[PayloadKey.TOTAL_VALUE] = await this.calculateTotalValue(portfolio[PayloadKey.POSITIONS]);
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
        result[PayloadKey.TOTAL_VALUE] = await this.calculateTotalValue(result[PayloadKey.POSITIONS]);
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
        let totalValue: number = 0
        for (const position of positions) {
            if (position.values.length) {
                totalValue += position.values[0].value
            }
        }
        return totalValue;
    }

    async addPortfolio(userId: string, portfolio: Portfolio) {
        return this.db.addPortfolio(userId, portfolio);
    }
}

export { PortfolioService }