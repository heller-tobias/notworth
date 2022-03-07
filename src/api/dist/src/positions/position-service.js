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
exports.PositionService = void 0;
const { body, validationResult } = require('express-validator/check');
const express_validator_1 = require("express-validator");
const api_definition_1 = require("../helper/api-definition");
class PositionService {
    constructor(db, portfolioService, categoryService) {
        this.positionExists = (value, userId, { req }) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.db.getPositionById(userId, req.params.portfolioId, req.params.positionId)) {
                console.log("resolve positionExists");
                return Promise.resolve();
            }
            else {
                console.log("reject");
                return Promise.reject();
            }
        });
        this.createPosition = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
                if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                    return;
                }
                const { name, description, userId, category } = req.body;
                const position = { id: "", name: name, description: description, category: category, portfolioId: req.params.portfolioId };
                res.json(yield this.db.addPosition(userId, position));
            }
            catch (err) {
                return next(err);
            }
        });
        this.getPositions = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
                if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                    return;
                }
                const { userId } = req.body;
                const portfolioId = req.params.portfolioId;
                res.json(yield this.getPositionsWithValuesById(userId, portfolioId));
            }
            catch (err) {
                return next(err);
            }
        });
        this.getPositionById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
                if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                    return;
                }
                const { userId } = req.body;
                const portfolioId = req.params.portfolioId;
                const positionId = req.params.id;
                const result = yield this.db.getPositionById(userId, portfolioId, positionId);
                if (!result) {
                    res.status(404);
                    res.end();
                    return;
                }
                result[api_definition_1.PayloadKey.VALUES] = yield this.db.getValues(userId, portfolioId, result["id"]);
                res.json(result);
            }
            catch (err) {
                return next(err);
            }
        });
        this.db = db;
        this.portfolioService = portfolioService;
        this.categoryService = categoryService;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.init();
        });
    }
    validate(method) {
        switch (method) {
            case 'createPosition':
                {
                    return [
                        body('name', 'name doesnt exist').exists(),
                        body('description').optional().isString(),
                        (0, express_validator_1.param)('portfolioId', 'portfolio does not exist').exists().isString().bail().custom((value, { req }) => this.portfolioService.portfolioExists(value, req.body.userId, { req })),
                        body('category', 'category does not exist').exists().bail().custom((value, { req }) => this.categoryService.doesCategoryExistForPortolio(req.body.userId, req.params.portfolioId, value))
                    ];
                }
                ;
            case 'getPosition': {
                return [
                    (0, express_validator_1.param)('portfolioId', 'portfolio does not exist').exists().isString().bail().custom((value, { req }) => this.portfolioService.portfolioExists(value, req.body.userId, { req })),
                ];
            }
        }
    }
    getPositionsWithValuesById(userId, portfolioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const positions = yield this.db.getPositions(userId, portfolioId);
            const returnPositions = [];
            for (const position of positions) {
                position[api_definition_1.PayloadKey.VALUES] = yield this.db.getValues(userId, portfolioId, position["id"]);
                returnPositions.push(position);
            }
            return returnPositions;
        });
    }
}
exports.PositionService = PositionService;
//# sourceMappingURL=position-service.js.map