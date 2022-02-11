import { MongoClient } from "mongodb";
import { Portfolio } from "../portfolios/portfolio";
import { NotworthDatabase } from './notworth-database';

class MongoDatabase implements NotworthDatabase{

    collectionName = 'technologies';
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
        this.db = this.client.db('techradar');
        this.id = 2;    
    }

    addPortfolio(userId: string, portfolio: Portfolio) {
        throw new Error("Method not implemented.");
    }

    async getPortfolios(userId: string){
        return this.db.collection(this.collectionName).find({}).toArray();
    }

    getPortfolioById(userId: string, portfolioId: number): Promise<Portfolio[]> {
        throw new Error("Method not implemented.");
    }



    async addTechnology(technology){
        technology.id = this.id;
        this.id += 1;
        let r = await this.db.collection(this.collectionName).insertOne(technology);
        console.log(r);
    }

    async getTechnology(id){
        return await this.db.collection(this.collectionName).findOne({"id": Number(id)});
    }

    async getTechnologies(){
    }

}

export { MongoDatabase }