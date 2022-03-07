"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabase = void 0;
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
class MongoDatabase {
    constructor(connectionString) {
        this.portfoliosCollection = 'portfolios';
        this.positionsCollection = 'positions';
        this.positionsValuesCollection = 'values';
        this.connectionString = connectionString;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoClient = new mongodb_1.MongoClient(this.connectionString);
            console.log('Connecting to server...');
            this.client = yield mongoClient.connect();
            console.log('Connected correctly to server');
            this.db = this.client.db('notworth');
        });
    }
    addPortfolio(userId, portfolio) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = (0, uuid_1.v4)();
            console.log(id);
            portfolio["id"] = id;
            portfolio["userId"] = userId;
            this.db.collection(this.portfoliosCollection).insertOne(portfolio);
            return id;
        });
    }
    getPortfolios(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.portfoliosCollection).find({ userId: userId }, { projection: { _id: 0, userId: 0 } }).toArray();
        });
    }
    getPortfolioById(userId, portfolioId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.portfoliosCollection).findOne({ userId: userId, id: portfolioId }, { projection: { _id: 0, userId: 0 } });
        });
    }
    addPosition(userId, position) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = (0, uuid_1.v4)();
            position["id"] = id;
            position["userId"] = userId;
            this.db.collection(this.positionsCollection).insertOne(position);
            return id;
        });
    }
    getPositions(userId, portfolioId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.positionsCollection).find({ userId: userId, portfolioId: portfolioId }, { projection: { _id: 0, userId: 0, portfolioId: 0 } }).toArray();
        });
    }
    getPositionById(userId, portfolioId, positionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.positionsCollection).findOne({ userId: userId, portfolioId: portfolioId, id: positionId }, { projection: { _id: 0, userId: 0, portfolioId: 0 } });
        });
    }
    addValue(userId, positionValue) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: Maybe check that it will overwrite the current value of a date if there is already a positionValue on this date!
            let id = (0, uuid_1.v4)();
            positionValue["id"] = id;
            positionValue["userId"] = userId;
            this.db.collection(this.positionsValuesCollection).insertOne(positionValue);
            return id;
        });
    }
    getValues(userId, portfolioId, positionId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`userId: ${userId}, portfolioId: ${portfolioId}, positionId: ${positionId}`);
            return this.db.collection(this.positionsValuesCollection).find({ userId: userId, portfolioId: portfolioId, positionId: positionId }, { projection: { _id: 0, userId: 0, portfolioId: 0, positionId: 0 } }).sort({ date: -1 }).toArray();
        });
    }
}
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=mongodb-database.js.map