import { CurrentTotalValue } from "./current-total-value";
import { Position } from "./position";

export interface Portfolio {
    id: string,
    currentTotalValue: CurrentTotalValue,
    name: string,
    description: string,
    positions: Array<Position>
}

export const DefaultPortfolio = {
    id: "-1", name: "New", description: "", currentTotalValue: { value: 0, minDate: new Date(-1), maxDate: new Date(-1) }, positions: []
};

export function copyPortfolio(portfolio: Portfolio)
{
    return JSON.parse(JSON.stringify(portfolio));
};