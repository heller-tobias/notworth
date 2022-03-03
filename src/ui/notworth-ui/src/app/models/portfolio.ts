import { CurrentTotalValue } from "./current-total-value";
import { HistoricTotalValue } from "./historic-total-value";
import { Position } from "./position";

export interface Portfolio {
    id: string,
    currentTotalValue: CurrentTotalValue,
    historicTotalValue: Array<HistoricTotalValue>,
    name: string,
    description: string,
    positions: Array<Position>
}

export const DefaultPortfolio = {
    id: "-1", name: "", description: "", currentTotalValue: { value: 0, minDate: new Date(-1), maxDate: new Date(-1) }, historicTotalValue: [], positions: []
};
