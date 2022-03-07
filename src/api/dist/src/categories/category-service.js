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
exports.CategoryService = void 0;
const express_validator_1 = require("express-validator");
class CategoryService {
  constructor(db, portfolioService) {
    this.getCategories = (req, res, next) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const errors = (0, express_validator_1.validationResult)(req); // Finds the validation errors in this request and wraps them in an object with handy functions
          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
          const { userId } = req.body;
          const portfolioId = req.params.portfolioId;
          res.json(yield this.getCategoriesFromDb(userId, portfolioId));
        } catch (err) {
          return next(err);
        }
      });
    this.db = db;
    this.portfolioService = portfolioService;
  }
  init() {
    return __awaiter(this, void 0, void 0, function* () {
      this.db.init();
    });
  }
  validate(method) {
    switch (method) {
      case "getCategories": {
        return [
          (0, express_validator_1.param)(
            "portfolioId",
            "portfolio does not exist"
          )
            .exists()
            .isString()
            .bail()
            .custom((value, { req }) =>
              this.portfolioService.portfolioExists(value, req.body.userId, {
                req,
              })
            ),
        ];
      }
    }
  }
  getCategoriesFromDb(userId, portfolioId) {
    return [
      {
        name: "investments",
        description: "All my stock portfolios.",
      },
      {
        name: "savings",
        description: "All my saving accounts.",
      },
      {
        name: "retirement",
        description: "All my retirement accounts.",
      },
      {
        name: "realestate",
        description: "All my real estate.",
      },
    ];
  }
  doesCategoryExistForPortolio(userId, portfolioId, categoryName) {
    return this.getCategoriesFromDb(userId, portfolioId)
      .map((category) => category.name)
      .includes(categoryName);
  }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category-service.js.map
