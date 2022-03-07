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
exports.ValueService = void 0;
const express_validator_1 = require("express-validator");
const { body, validationResult } = require('express-validator/check');
class ValueService {
    constructor(db, portfolioService, positionService) {
        this.VALUES = "values";
        this.isValueNumberGreaterEqualZero = (value) => __awaiter(this, void 0, void 0, function* () {
            if (!(typeof value == 'number')) {
                throw new Error("Value should be a number!");
            }
            if (value < 0) {
                throw new Error("Value should be positive!");
            }
            return true;
        });
        this.isDateNotInTheFuture = (value) => __awaiter(this, void 0, void 0, function* () {
            let enteredDate = new Date(value);
            let todaysDate = new Date();
            if (enteredDate > todaysDate) {
                throw new Error("Date should not be in the future!");
            }
            return true;
        });
        this.createValue = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
                if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                    return;
                }
                const { value, date, userId } = req.body;
                const positionValue = { id: "", value: value, date: date, portfolioId: req.params.portfolioId, positionId: req.params.positionId };
                res.json(yield this.addValue(userId, positionValue));
            }
            catch (err) {
                return next(err);
            }
        });
        this.getValues = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
                if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                    return;
                }
                const { userId } = req.body;
                const portfolioId = req.params.portfolioId;
                const positionId = req.params.positionId;
                res.json(yield this.db.getValues(userId, portfolioId, positionId));
            }
            catch (err) {
                return next(err);
            }
        });
        this.db = db;
        this.portfolioService = portfolioService;
        this.positionService = positionService;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.init();
        });
    }
    validate(method) {
        switch (method) {
            case 'createValue': {
                return [
                    body('value', 'value doesnt exist').exists().custom(value => this.isValueNumberGreaterEqualZero(value)),
                    body('date').exists().isISO8601().isDate().custom(value => this.isDateNotInTheFuture(value)),
                    (0, express_validator_1.param)('portfolioId', 'portfolio does not exist').exists().isString().bail().custom((value, { req }) => this.portfolioService.portfolioExists(value, req.body.userId, { req })),
                    (0, express_validator_1.param)('positionId', 'position does not exist').exists().isString().bail().custom((value, { req }) => this.positionService.positionExists(value, req.body.userId, { req }))
                ];
            }
            case 'getValues': {
                return [
                    (0, express_validator_1.param)('portfolioId', 'portfolio does not exist').exists().isString().bail().custom((value, { req }) => this.portfolioService.portfolioExists(value, req.body.userId, { req })),
                    (0, express_validator_1.param)('positionId', 'position does not exist').exists().isString().bail().custom((value, { req }) => this.positionService.positionExists(value, req.body.userId, { req }))
                ];
            }
        }
    }
    addValue(userId, positionValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.addValue(userId, positionValue);
        });
    }
}
exports.ValueService = ValueService;
//# sourceMappingURL=value-service.js.map