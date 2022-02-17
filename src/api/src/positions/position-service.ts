import { NotworthDatabase } from "../db/notworth-database";
const { body, validationResult } = require('express-validator/check')
import { CategoryService } from "../categories/category-service";
import { param } from "express-validator";
import { Position } from "./position";
import { PortfolioService } from "../portfolios/portfolio-service";

class PositionService {
    db: NotworthDatabase;
    portfolioService: PortfolioService;
    categoryService: CategoryService;

    constructor(db: NotworthDatabase, portfolioService: PortfolioService, categoryService: CategoryService) {
        this.db = db;
        this.portfolioService = portfolioService;
        this.categoryService = categoryService;
    }

    async init() {
        this.db.init();
    }

    validate(method, userId) {
        switch (method) {
            case 'createPosition': {
                return [
                    body('name', 'name doesnt exist').exists(),
                    body('description').optional().isString(),
                    param('portfolioId', 'portfolio does not exist').exists().isString().bail().custom(async (value, { req }) => {
                        if (await this.portfolioService.getPortfolioById(userId, req.params.portfolioId)) {
                            console.log("resolve");
                            return Promise.resolve();
                        }
                        else {
                            console.log("reject");
                            return Promise.reject();
                        }
                    }),
                    body('category', 'category does not exist').exists().bail().custom((value, { req }) => this.categoryService.getCategories(userId, req.params.portfolioId).includes(value))
                ]
            }
        }
    }

    createPosition = async (req: any, res: any, next: any) => {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                return;
            }

            const { name, description, userId, category } = req.body

            const position: Position = { id: "", name: name, description: description, category: category, portfolioId: req.params.portfolioId }
            res.json(await this.addPosition(userId, position));
        } catch (err) {
            return next(err)
        }
    }

    async addPosition(userId: string, position: Position) {
        return this.db.addPosition(userId, position);
    }
}

export { PositionService }