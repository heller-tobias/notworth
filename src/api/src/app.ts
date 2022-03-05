import express from 'express';
import bodyParser from 'body-parser';
import { MongoDatabase } from './db/mongodb-database';
import { PortfolioService } from './portfolios/portfolio-service';
import { PositionService } from './positions/position-service';
import { CategoryService } from './categories/category-service';
import { ValueService } from './values/value-service';
import { Url } from './helper/api-definition';
require('dotenv').config()

const path = require('path')
const server = express();
const port = 3000;
server.use(bodyParser.json());
let router = express.Router();

const portfolioService = new PortfolioService(new MongoDatabase(process.env.MONGO_URL))
const categoryService = new CategoryService(new MongoDatabase(process.env.MONGO_URL), portfolioService)
const positionService = new PositionService(new MongoDatabase(process.env.MONGO_URL), portfolioService, categoryService);
const valueService = new ValueService(new MongoDatabase(process.env.MONGO_URL), portfolioService, positionService);

portfolioService.init();
positionService.init();
categoryService.init();
valueService.init();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log('Request URL:', req.originalUrl);
  console.log('Request Type:', req.method);
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers);
  req.body.userId = parseUserId();

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * Get all the Portfolios for the current user.
 */
router.get(`/${Url.PORTFOLIOS}`, (req, res, nex) => {
  const userId = parseUserId();
  portfolioService.getPortfolios(userId).then((result) => {
     res.json(result)
  });
});

/**
 * Get a Portfolio with the passed it.
 */
router.get(`/${Url.PORTFOLIOS}/:id`, (req, res, nex) => {
  const userId = parseUserId();
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
 * Create a Portfolio.
 */
router.post(`/${Url.PORTFOLIOS}`,
  portfolioService.validate('createPortfolio'),
  portfolioService.createPortfolio
);

/**
 * Get all the Positions of a Portfolio with a certain id.
 */
router.get(`/${Url.PORTFOLIOS}/:portfolioId/${Url.POSITIONS}`,
  positionService.validate('getPosition', parseUserId()),
  positionService.getPositions
);

/**
 * Get a Position of a Portfolio with a certain id.
 */
router.get(`/${Url.PORTFOLIOS}/:portfolioId/${Url.POSITIONS}/:id`,
  positionService.validate('getPosition', parseUserId()),
  positionService.getPositionById
);

/**
 * Create a new position for the specified Portfolio.
 */
router.post(`/${Url.PORTFOLIOS}/:portfolioId/${Url.POSITIONS}`,
  positionService.validate('createPosition', parseUserId()),
  positionService.createPosition
);


/**
 * Get all the Values of a Portfolio Position.
 */
router.get(`/${Url.PORTFOLIOS}/:portfolioId/${Url.POSITIONS}/:positionId/${Url.VALUES}`,
  valueService.validate('getValues', parseUserId()),
  valueService.getValues
);

/**
* Create a new position value for the specified PortfolioPosition.
*/
router.post(`/${Url.PORTFOLIOS}/:portfolioId/${Url.POSITIONS}/:positionId/${Url.VALUES}`,
  valueService.validate('createValue', parseUserId()),
  valueService.createValue
);

/**
 * Get all the categories of a Portfolio.
 */
 router.get(`/${Url.PORTFOLIOS}/:portfolioId/${Url.CATEGORIES}`,
 categoryService.validate('getCategories', parseUserId()),
 categoryService.getCategories
);

function parseUserId(): string {
  return "tobias";
}

// mount the router on the server
server.use('/', router);
server.use('/static', express.static(path.join(__dirname, 'public')))

server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

module.exports = server