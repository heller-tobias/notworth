import { NotworthDatabase } from "../db/notworth-database";

class CategoryService {
    db: NotworthDatabase;

    constructor(db: NotworthDatabase) {
        this.db = db;
    }

    async init() {
        this.db.init();
    }

    static getCategories(userId: string, portfolioId: string){
        return ["savings", "investments", "retirement"];
    }
}

export {CategoryService}