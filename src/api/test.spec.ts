const request = require('supertest');
const app = require('./src/app.ts');
const {MongoClient} = require('mongodb');

let connection;
let db;
let portfolios;

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await connection.db('notworth');
  portfolios = db.collection('portfolios');
});

describe('GET /portfolios', () => {
    it('responds with 200', (done) => {
        request(app)
            .get('/portfolios')
            .expect(200, done);
    });

    it('responds with one portfolio', async () => {
        const mockPortfolio = {id:"1", name: 'myPortfolio', description: "This is my wonderful portfolio.", userId: "tobias"};
        await portfolios.insertOne(mockPortfolio);
        console.log(await portfolios.find());

        const response = await request(app).get('/portfolios').expect(200);
        expect(response.body).toBeDefined();
        expect(response.body[0].name).toBe(mockPortfolio.name);
        return response;
    });
});

describe('GET /portfolios', () => {
  it('responds with 200', (done) => {
      request(app)
          .get('/portfolios')
          .expect(200, done);
  });

  it('responds with one portfolio', async () => {
      const mockPortfolio = {id:"3", name: 'myPortfolio', description: "This is my wonderful portfolio.", userId: "tobias"};
      await portfolios.insertOne(mockPortfolio);

      const response = await request(app).get('/portfolios/3').expect(200);
      console.log(response.body)
      expect(response.body).toBeDefined();
      expect(response.body.name).toBe(mockPortfolio.name);
      expect(response.body.description).toBe(mockPortfolio.description);
      return response;
  });
});

describe('POST /portfolios', () => {
  const mockPortfolio = {
    name: "My Portfolio",
    description: "A nice description"
  }

  let portfolioId = "-1";

  it('responds with 200', (done) => {
      request(app)
          .post('/portfolios')
          .send(mockPortfolio)
          .expect(200)
          .then(response => {portfolioId = response.body; done()});

  });

  it('responds with one portfolio', async () => {
      const response = await request(app).get(`/portfolios/${portfolioId}`).expect(200);
      console.log(response.body)
      expect(response.body).toBeDefined();
      expect(response.body.name).toBe(mockPortfolio.name);
      expect(response.body.description).toBe(mockPortfolio.description);
      return response;
  });
});


afterAll(async () => {
    await connection.close();
});