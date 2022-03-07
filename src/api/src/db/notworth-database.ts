import { Portfolio } from "../portfolios/portfolio";
import { Position } from "../positions/position";
import { PositionValue } from "../values/position-value";

interface NotworthDatabase {
  init();

  addPortfolio(userId: string, portfolio: Portfolio);
  getPortfolios(userId: string);
  getPortfolioById(userId: string, portfolioId: string);

  addPosition(userId: string, position: Position);
  getPositions(userId: string, portfolioId: string);
  getPositionById(userId: string, portfolioId: string, positionId: string);

  addValue(userId: string, positionValue: PositionValue);
  getValues(userId: string, portfolioId: string, positionId: string);
}

export { NotworthDatabase };
