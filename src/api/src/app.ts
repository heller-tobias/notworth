import express from 'express';
require('dotenv').config()
import bodyParser from 'body-parser';
import { MongoDatabase } from './db/mongodb-database';
import { Portfolio } from './portfolios/portfolio';
import { PortfolioService } from './portfolios/portfolio-service';
import { body, validationResult } from 'express-validator';
import { parse } from 'dotenv';
import { PositionService } from './positions/position-service';
import { CategoryService } from './categories/category-service';
import { ValueService } from './values/value-service';


const PORTFOLIOS_URL: string = "portfolios";
const POSITIONS_URL: string = "positions";
const VALUES_URL: string = "values";

const app = express();
const port = 3000;
app.use(bodyParser.json());
let router = express.Router();

const portfolioService = new PortfolioService(new MongoDatabase(process.env.MONGO_DB_STRING))
const categoryService = new CategoryService(new MongoDatabase(process.env.MONGO_DB_STRING))
const positionService = new PositionService(new MongoDatabase(process.env.MONGO_DB_STRING), portfolioService, categoryService);
const valueService = new ValueService(new MongoDatabase(process.env.MONGO_DB_STRING), positionService);

portfolioService.init();
positionService.init();
categoryService.init();
valueService.init();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log('Request URL:', req.originalUrl);
  console.log('Request Type:', req.method);
  console.log('Request Body:', req.body);
  req.body.userId = parseUserId();
  next();
});

/**
 * Get all the Portfolios for the current user.
 */
router.get(`/${PORTFOLIOS_URL}`, (req, res, nex) => {
  const userId: string = parseUserId();
  portfolioService.getPortfolios(userId).then((result) => {
    res.json(result)
  });
});

/**
 * Get a Portfolio with the passed it.
 */
router.get(`/${PORTFOLIOS_URL}/:id`, (req, res, nex) => {
  const userId: string = parseUserId();
  portfolioService.getPortfolioById(userId, req.params.id).then((result) => {
    console.log(result)
    if (!result) {
      res.status(404);
      res.end();
      return;
    }
    res.json(result)
  });
});

/**
 * Get all the Positions of a Portfolio with a certain id.
 */
router.get(`/${PORTFOLIOS_URL}/:portfolioId/${POSITIONS_URL}`,
  positionService.validate('getPosition', parseUserId()),
  positionService.getPositions
);

/**
 * Get a Position of a Portfolio with a certain id.
 */
router.get(`/${PORTFOLIOS_URL}/:portfolioId/${POSITIONS_URL}/:id`,
  positionService.validate('getPosition', parseUserId()),
  positionService.getPositionById
);

/**
 * Create a new position for the specified Portfolio.
 */
router.post(`/${PORTFOLIOS_URL}/:portfolioId/${POSITIONS_URL}`,
  positionService.validate('createPosition', parseUserId()),
  positionService.createPosition
);


/**
 * Get all the Values of a Portfolio Position.
 */
 router.get(`/${PORTFOLIOS_URL}/:portfolioId/${POSITIONS_URL}/:positionId/${VALUES_URL}`,
 valueService.validate('getValues', parseUserId()),
 valueService.getValues
);

/**
* Create a new position value for the specified PortfolioPosition.
*/
router.post(`/${PORTFOLIOS_URL}/:portfolioId/${POSITIONS_URL}/:positionId/${VALUES_URL}`,
valueService.validate('createValue', parseUserId()),
valueService.createValue
);

function parseUserId(): string {
  return "tobias";
}

// mount the router on the app
app.use('/', router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});