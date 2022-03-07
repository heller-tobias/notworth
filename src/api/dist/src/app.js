"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_database_1 = require("./db/mongodb-database");
const portfolio_service_1 = require("./portfolios/portfolio-service");
const position_service_1 = require("./positions/position-service");
const category_service_1 = require("./categories/category-service");
const value_service_1 = require("./values/value-service");
const api_definition_1 = require("./helper/api-definition");
const jwt_validator_1 = require("./services/jwt-validator");
require('dotenv').config();
const path = require('path');
const server = (0, express_1.default)();
const port = 3000;
server.use(body_parser_1.default.json());
let router = express_1.default.Router();
const portfolioService = new portfolio_service_1.PortfolioService(new mongodb_database_1.MongoDatabase(process.env.MONGO_URL));
const categoryService = new category_service_1.CategoryService(new mongodb_database_1.MongoDatabase(process.env.MONGO_URL), portfolioService);
const positionService = new position_service_1.PositionService(new mongodb_database_1.MongoDatabase(process.env.MONGO_URL), portfolioService, categoryService);
const valueService = new value_service_1.ValueService(new mongodb_database_1.MongoDatabase(process.env.MONGO_URL), portfolioService, positionService);
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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    next();
});
/**
 * Get all the Portfolios for the current user.
 */
router.get(`/${api_definition_1.Url.PORTFOLIOS}`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, (req, res, nex) => {
    const userId = (0, jwt_validator_1.parseUserId)(req);
    console.log(userId);
    portfolioService.getPortfolios(userId).then((result) => {
        res.json(result);
    });
});
/**
 * Get a Portfolio with the passed it.
 */
router.get(`/${api_definition_1.Url.PORTFOLIOS}/:id`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, (req, res, nex) => {
    const userId = (0, jwt_validator_1.parseUserId)(req);
    console.log(userId);
    portfolioService.getPortfolioById(userId, req.params.id).then((result) => {
        console.log(result);
        if (!result) {
            res.status(404);
            res.end();
            return;
        }
        res.json(result);
    });
});
/**
 * Create a Portfolio.
 */
router.post(`/${api_definition_1.Url.PORTFOLIOS}`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, portfolioService.validate('createPortfolio'), portfolioService.createPortfolio);
/**
 * Get all the Positions of a Portfolio with a certain id.
 */
router.get(`/${api_definition_1.Url.PORTFOLIOS}/:portfolioId/${api_definition_1.Url.POSITIONS}`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, positionService.validate('getPosition'), positionService.getPositions);
/**
 * Get a Position of a Portfolio with a certain id.
 */
router.get(`/${api_definition_1.Url.PORTFOLIOS}/:portfolioId/${api_definition_1.Url.POSITIONS}/:id`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, positionService.validate('getPosition'), positionService.getPositionById);
/**
 * Create a new position for the specified Portfolio.
 */
router.post(`/${api_definition_1.Url.PORTFOLIOS}/:portfolioId/${api_definition_1.Url.POSITIONS}`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, positionService.validate('createPosition'), positionService.createPosition);
/**
 * Get all the Values of a Portfolio Position.
 */
router.get(`/${api_definition_1.Url.PORTFOLIOS}/:portfolioId/${api_definition_1.Url.POSITIONS}/:positionId/${api_definition_1.Url.VALUES}`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, valueService.validate('getValues'), valueService.getValues);
/**
* Create a new position value for the specified PortfolioPosition.
*/
router.post(`/${api_definition_1.Url.PORTFOLIOS}/:portfolioId/${api_definition_1.Url.POSITIONS}/:positionId/${api_definition_1.Url.VALUES}`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, valueService.validate('createValue'), valueService.createValue);
/**
 * Get all the categories of a Portfolio.
 */
router.get(`/${api_definition_1.Url.PORTFOLIOS}/:portfolioId/${api_definition_1.Url.CATEGORIES}`, jwt_validator_1.checkJwt, jwt_validator_1.checkJwtScopes, jwt_validator_1.setUser, categoryService.validate('getCategories'), categoryService.getCategories);
// mount the router on the server
server.use('/', router);
server.use('/static', express_1.default.static(path.join(__dirname, 'public')));
server.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
module.exports = server;
//# sourceMappingURL=app.js.map