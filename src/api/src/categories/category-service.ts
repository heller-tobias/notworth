import { param, validationResult } from "express-validator";
import { NotworthDatabase } from "../db/notworth-database";
import { PortfolioService } from "../portfolios/portfolio-service";

class CategoryService {
    db: NotworthDatabase;
    portfolioService: PortfolioService;

    constructor(db: NotworthDatabase, portfolioService: PortfolioService) {
        this.db = db;
        this.portfolioService = portfolioService;
    }

    async init() {
        this.db.init();
    }

    validate(method) {
        switch (method) {
            case 'getCategories': {
                return [
                    param('portfolioId', 'portfolio does not exist').exists().isString().bail().custom((value, { req }) => this.portfolioService.portfolioExists(value, req.body.userId, { req })),
                ]
            }
        }
    }

    getCategories = async (req: any, res: any, next: any) => {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                return;
            }

            const { userId } = req.body;
            const portfolioId = req.params.portfolioId;
            res.json(await this.getCategoriesFromDb(userId, portfolioId));
        } catch (err) {
            return next(err)
        }
    }

    getCategoriesFromDb(userId: string, portfolioId: string): Array<any> {
        return [{
            "name": "investments",
            "description": "All my stock portfolios."
        },
        {
            "name": "savings",
            "description": "All my saving accounts."
        },
        {
            "name": "retirement",
            "description": "All my retirement accounts."
        },
        {
            "name": "realestate",
            "description": "All my real estate."
        }
        ]
    }

    doesCategoryExistForPortolio(userId: string, portfolioId: string, categoryName: string): boolean {
        return this.getCategoriesFromDb(userId, portfolioId).map(category => category.name).includes(categoryName);
    }
}

export { CategoryService }