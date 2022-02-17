import { Portfolio } from "../portfolios/portfolio";
import { Position } from "../positions/position";

interface NotworthDatabase{
    init();
    addPortfolio(userId: string, portfolio: Portfolio);
    getPortfolios(userId: string);
    getPortfolioById(userId: string, portfolioId: string);
    addPosition(userId: string, position: Position)
}

export { NotworthDatabase }