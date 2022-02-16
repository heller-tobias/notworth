import { json } from "express";
import { NotworthDatabase } from "../db/notworth-database";
import { Portfolio } from "./portfolio";
const { body, validationResult } = require('express-validator/check')
import { CategoryService } from "../categories/category-service";

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

     createPortfolio = async(req: any, res: any, next: any) => {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                return;
            }

            console.log(req.body)

            const { name, description, userId } = req.body

            const portfolio: Portfolio = { id: "", name: name, description: description }
            console.log(portfolio)
            console.log(this);
            res.json(await this.addPortfolio(userId, portfolio));
        } catch (err) {
            return next(err)
        }
    }

    async getPortfolios(userId: string) {
        return this.db.getPortfolios(userId);
    }

    async getPortfolioById(userId: string, portfolioId: string) {
        return this.db.getPortfolioById(userId, portfolioId);
    }

    async addPortfolio(userId: string, portfolio: Portfolio) {
        return this.db.addPortfolio(userId, portfolio);
    }
}

export { PortfolioService }