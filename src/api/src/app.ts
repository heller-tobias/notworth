import express from 'express';
require('dotenv').config()

import { MongoDatabase } from './db/mongodb-database';
import { PortfolioService } from './portfolios/portfolio-service';
const app = express();
const port = 3000;
const PORTFOLIOS_URL = "portfolios";

const portfolioService = new PortfolioService(new MongoDatabase(process.env.MONGO_DB_STRING))
portfolioService.init();

app.get(`/${PORTFOLIOS_URL}`, (req, res) => {
  portfolioService.getPortfolios("tobias").then((result) =>{
    res.json(result)
  });
 
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});