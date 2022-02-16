import { Portfolio } from "../portfolios/portfolio";

interface NotworthDatabase{
    init();
    addPortfolio(userId: string, portfolio: Portfolio);
    getPortfolios(userId: string);
    getPortfolioById(userId: string, portfolioId: string);
}

export { NotworthDatabase }