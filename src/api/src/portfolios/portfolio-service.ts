import { NotworthDatabase } from "../db/notworth-database";

class PortfolioService{
    db: NotworthDatabase;

    constructor(db: NotworthDatabase){
        this.db = db;
    }

    async init(){
        this.db.init();
    }

    async getPortfolios(userId: string){
        return this.db.getPortfolios(userId);
    }
}

export { PortfolioService }