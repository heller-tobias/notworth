import { MongoClient } from "mongodb";
import { Portfolio } from "../portfolios/portfolio";
import { NotworthDatabase } from "./notworth-database";
import { v4 as uuidv4 } from "uuid";
import { Position } from "../positions/position";
import { PositionValue } from "../values/position-value";

class MongoDatabase implements NotworthDatabase {
  portfoliosCollection = "portfolios";
  positionsCollection = "positions";
  positionsValuesCollection = "values";

  connectionString;
  client;
  db;
  id;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async init() {
    const mongoClient = new MongoClient(this.connectionString);
    console.log("MongoDatabase - Connecting to server...");
    this.client = await mongoClient.connect();
    console.log(" MongoDatabase - Connected correctly to server");
    this.db = this.client.db("notworth");
  }

  async addPortfolio(userId: string, portfolio: Portfolio) {
    console.log(`MongoDatabase - add Portfolio with id: ${portfolio.id} - name: ${portfolio.name} for user: ${userId}`)
    let id: string = uuidv4();
    portfolio["id"] = id;
    portfolio["userId"] = userId;
    this.db.collection(this.portfoliosCollection).insertOne(portfolio);
    return id;
  }

  async getPortfolios(userId: string) {
    console.log(`MongoDatabase - getPortfolios for user: ${userId}`)
    return this.db
      .collection(this.portfoliosCollection)
      .find({ userId: userId }, { projection: { _id: 0, userId: 0 } })
      .toArray();
  }

  async getPortfolioById(
    userId: string,
    portfolioId: string
  ): Promise<Portfolio[]> {
    console.log(`MongoDatabase - getPortfolioById with id: ${portfolioId} for user: ${userId}`)
    return this.db
      .collection(this.portfoliosCollection)
      .findOne(
        { userId: userId, id: portfolioId },
        { projection: { _id: 0, userId: 0 } }
      );
  }

  async addPosition(userId: string, position: Position) {
    console.log(`MongoDatabase - add Position with id: ${position.id} - portfolio: ${position.portfolioId} - name: ${position.name} for user: ${userId}`)
    let id: string = uuidv4();
    position["id"] = id;
    position["userId"] = userId;
    this.db.collection(this.positionsCollection).insertOne(position);
    return id;
  }

  async getPositions(userId: string, portfolioId: string) {
    console.log(`MongoDatabase - getPositions for portfolio with id: ${portfolioId} for user: ${userId}`)
    return this.db
      .collection(this.positionsCollection)
      .find(
        { userId: userId, portfolioId: portfolioId },
        { projection: { _id: 0, userId: 0, portfolioId: 0 } }
      )
      .toArray();
  }

  async getPositionById(
    userId: string,
    portfolioId: string,
    positionId: string
  ) {
    console.log(`MongoDatabase - getPositionById with id: ${positionId} - portfolio: ${portfolioId} for user: ${userId}`)
    return this.db
      .collection(this.positionsCollection)
      .findOne(
        { userId: userId, portfolioId: portfolioId, id: positionId },
        { projection: { _id: 0, userId: 0, portfolioId: 0 } }
      );
  }

  async addValue(userId: string, positionValue: PositionValue) {
    console.log(`MongoDatabase - add Value with id ${positionValue.id}- position: ${positionValue.positionId} - portfolio: ${positionValue.portfolioId} for user: ${userId}`)
    //TODO: Maybe check that it will overwrite the current value of a date if there is already a positionValue on this date!
    let id: string = uuidv4();
    positionValue["id"] = id;
    positionValue["userId"] = userId;
    this.db.collection(this.positionsValuesCollection).insertOne(positionValue);
    return id;
  }

  async getValues(userId: string, portfolioId: string, positionId: string) {
    console.log(`MongoDatabase - getValues position: ${positionId} - portfolio: ${portfolioId} for user: ${userId}`)
    return this.db
      .collection(this.positionsValuesCollection)
      .find(
        { userId: userId, portfolioId: portfolioId, positionId: positionId },
        { projection: { _id: 0, userId: 0, portfolioId: 0, positionId: 0 } }
      )
      .sort({ date: -1 })
      .toArray();
  }
}

export { MongoDatabase };
