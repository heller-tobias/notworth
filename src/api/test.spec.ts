import { getTokenSourceMapRange } from "typescript";

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

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await connection.db("notworth");
  portfolios = db.collection("portfolios");
  positions = db.collection("positions");
  values = db.collection("values");
  token = process.env.TEST_TOKEN;
  userId = process.env.TEST_USER_ID;
});

describe("GET /portfolios", () => {
  it("responds with 200", (done) => {
    request(app)
      .get("/portfolios")
      .set("Authorization", token)
      .expect(200, done);
  });

  it("responds with one portfolio", async () => {
    const mockPortfolio = {
      id: "1",
      name: "myPortfolio",
      description: "This is my wonderful portfolio.",
      userId: userId,
    };
    await portfolios.insertOne(mockPortfolio);

    const response = await request(app)
      .get("/portfolios")
      .set("Authorization", token)
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].name).toBe(mockPortfolio.name);
    return response;
  });

  it("respond with total current value", async () => {
    const mockPortfolio = {
      id: "4",
      name: "myTotalCurrentValue",
      description: "This is my wonderful cool portfolio.",
      userId: userId,
    };
    await portfolios.insertOne(mockPortfolio);
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

    await positions.insertOne(mockPosition1);
    await positions.insertOne(mockPosition2);

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

    await values.insertOne(mockValue11);
    await values.insertOne(mockValue12);
    await values.insertOne(mockValue21);
    await values.insertOne(mockValue22);

    const response = await request(app)
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
  });
});

describe("GET /portfolios", () => {
  it("responds with 200", (done) => {
    request(app)
      .get("/portfolios")
      .set("Authorization", token)
      .expect(200, done);
  });

  it("responds with one portfolio", async () => {
    const mockPortfolio = {
      id: "3",
      name: "myPortfolio",
      description: "This is my wonderful portfolio.",
      userId: userId,
    };
    await portfolios.insertOne(mockPortfolio);

    const response = await request(app)
      .get("/portfolios/3")
      .set("Authorization", token)
      .expect(200);
    console.log(response.body);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(mockPortfolio.name);
    expect(response.body.description).toBe(mockPortfolio.description);
    return response;
  });
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

  it("responds with one portfolio", async () => {
    const response = await request(app)
      .get(`/portfolios/${portfolioId}`)
      .set("Authorization", token)
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(mockPortfolio.name);
    expect(response.body.description).toBe(mockPortfolio.description);
    return response;
  });
});

afterAll(async () => {
  await connection.close();
});
