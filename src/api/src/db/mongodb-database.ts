import { MongoClient } from "mongodb";
import { Portfolio } from "../portfolios/portfolio";
import { NotworthDatabase } from './notworth-database';
import { v4 as uuidv4 } from 'uuid';

class MongoDatabase implements NotworthDatabase{

    portfoliosCollection = 'portfolios';
    positionsCollection = 'positions';
    connectionString;
    client;
    db;
    id;

    constructor(connectionString: string){
        this.connectionString = connectionString;
    }

    async init(){
        const mongoClient = new MongoClient(this.connectionString);
        this.client = await mongoClient.connect()
        console.log('Connected correctly to server');
        this.db = this.client.db('notworth');
    }

    async addPortfolio(userId: string, portfolio: Portfolio) {
        let id: string = uuidv4();
        console.log(id)
        portfolio["id"] = id;
        portfolio["userId"] = userId;
        this.db.collection(this.portfoliosCollection).insertOne(portfolio);
        return id;
    }

    async getPortfolios(userId: string){
        return this.db.collection(this.portfoliosCollection).find({userId: userId}, {projection:{_id:0, userId: 0}}).toArray();
    }

    async getPortfolioById(userId: string, portfolioId: string): Promise<Portfolio[]> {
        return this.db.collection(this.portfoliosCollection).findOne({userId: userId, id: portfolioId}, {projection:{_id:0, userId: 0}});
    }
}

export { MongoDatabase }