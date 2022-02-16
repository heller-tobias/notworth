import express from 'express';
require('dotenv').config()
import bodyParser from 'body-parser';
import { MongoDatabase } from './db/mongodb-database';
import { Portfolio } from './portfolios/portfolio';
import { PortfolioService } from './portfolios/portfolio-service';
import { body, validationResult } from 'express-validator';
import { parse } from 'dotenv';

const app = express();
const port = 3000;
const PORTFOLIOS_URL = "portfolios";
app.use(bodyParser.json());

const portfolioService = new PortfolioService(new MongoDatabase(process.env.MONGO_DB_STRING))
portfolioService.init();
let router = express.Router();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log('Request URL:', req.originalUrl);
  console.log('Request Type:', req.method);
  console.log('Request Body:', req.body);
  req.body.userId = parseUserId();
  next();
});

router.get(`/${PORTFOLIOS_URL}`, (req, res, nex) => {
  const userId: string = parseUserId();
  portfolioService.getPortfolios(userId).then((result) => {
    res.json(result)
  });
});

router.get(`/${PORTFOLIOS_URL}/:id`, (req, res, nex) => {
  const userId: string = parseUserId();
  portfolioService.getPortfolioById(userId, req.params.id).then((result) => {
    if (!result) {
      res.status(404);
      res.end();
      return;
    }
    res.json(result)
  });
});

router.post(`/${PORTFOLIOS_URL}`,
  portfolioService.validate('createPortfolio'),
  portfolioService.createPortfolio
);

function parseUserId(): string {
  return "tobias";
}

// mount the router on the app
app.use('/', router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});