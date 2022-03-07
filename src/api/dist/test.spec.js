"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app = require("./src/app.ts");
const { MongoClient } = require("mongodb");
let connection;
let db;
let portfolios;
let positions;
let values;
let token;
let userId;
beforeAll(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    connection = yield MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = yield connection.db("notworth");
    portfolios = db.collection("portfolios");
    positions = db.collection("positions");
    values = db.collection("values");
    token = process.env.TEST_TOKEN;
    userId = process.env.TEST_USER_ID;
  })
);
describe("GET /portfolios", () => {
  it("responds with 200", (done) => {
    request(app)
      .get("/portfolios")
      .set("Authorization", token)
      .expect(200, done);
  });
  it("responds with one portfolio", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const mockPortfolio = {
        id: "1",
        name: "myPortfolio",
        description: "This is my wonderful portfolio.",
        userId: userId,
      };
      yield portfolios.insertOne(mockPortfolio);
      const response = yield request(app)
        .get("/portfolios")
        .set("Authorization", token)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body[0].name).toBe(mockPortfolio.name);
      return response;
    }));
  it("respond with total current value", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const mockPortfolio = {
        id: "4",
        name: "myTotalCurrentValue",
        description: "This is my wonderful cool portfolio.",
        userId: userId,
      };
      yield portfolios.insertOne(mockPortfolio);
      const mockPosition1 = {
        id: "1",
        portfolioId: "4",
        name: "LUKB",
        category: "savings",
        userId: userId,
      };
      const mockPosition2 = {
        id: "2",
        portfolioId: "4",
        name: "Swissquote",
        category: "investing",
        userId: userId,
      };
      yield positions.insertOne(mockPosition1);
      yield positions.insertOne(mockPosition2);
      const mockValue11 = {
        id: "11",
        portfolioId: "4",
        positionId: "1",
        value: 50,
        date: "2022-02-01",
        userId: userId,
      };
      const mockValue12 = {
        id: "12",
        portfolioId: "4",
        positionId: "1",
        value: 100,
        date: "2022-02-15",
        userId: userId,
      };
      const mockValue21 = {
        id: "21",
        portfolioId: "4",
        positionId: "2",
        value: 50,
        date: "2022-02-04",
        userId: userId,
      };
      const mockValue22 = {
        id: "22",
        portfolioId: "4",
        positionId: "2",
        value: 200,
        date: "2022-02-17",
        userId: userId,
      };
      yield values.insertOne(mockValue11);
      yield values.insertOne(mockValue12);
      yield values.insertOne(mockValue21);
      yield values.insertOne(mockValue22);
      const response = yield request(app)
        .get("/portfolios/4")
        .set("Authorization", token)
        .expect(200);
      expect(response.body).toBeDefined();
      console.log(response.body);
      const newestHistoricValue = response.body.historicTotalValue[0];
      expect(newestHistoricValue.date).toBe(
        new Date().toISOString().split("T")[0]
      );
      expect(newestHistoricValue.totalValue).toBe(300);
      const oldestHistoricValue =
        response.body.historicTotalValue[
          response.body.historicTotalValue.length - 1
        ];
      expect(oldestHistoricValue.date).toBe("2022-02-01");
      expect(oldestHistoricValue.totalValue).toBe(50);
      return response;
    }));
});
describe("GET /portfolios", () => {
  it("responds with 200", (done) => {
    request(app)
      .get("/portfolios")
      .set("Authorization", token)
      .expect(200, done);
  });
  it("responds with one portfolio", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const mockPortfolio = {
        id: "3",
        name: "myPortfolio",
        description: "This is my wonderful portfolio.",
        userId: userId,
      };
      yield portfolios.insertOne(mockPortfolio);
      const response = yield request(app)
        .get("/portfolios/3")
        .set("Authorization", token)
        .expect(200);
      console.log(response.body);
      expect(response.body).toBeDefined();
      expect(response.body.name).toBe(mockPortfolio.name);
      expect(response.body.description).toBe(mockPortfolio.description);
      return response;
    }));
});
describe("POST /portfolios", () => {
  const mockPortfolio = {
    name: "My Portfolio",
    description: "A nice description",
  };
  let portfolioId = "-1";
  it("responds with 200", (done) => {
    request(app)
      .post("/portfolios")
      .set("Authorization", token)
      .send(mockPortfolio)
      .expect(200)
      .then((response) => {
        portfolioId = response.body;
        done();
      });
  });
  it("responds with one portfolio", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request(app)
        .get(`/portfolios/${portfolioId}`)
        .set("Authorization", token)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.name).toBe(mockPortfolio.name);
      expect(response.body.description).toBe(mockPortfolio.description);
      return response;
    }));
});
afterAll(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
  })
);
//# sourceMappingURL=test.spec.js.map
