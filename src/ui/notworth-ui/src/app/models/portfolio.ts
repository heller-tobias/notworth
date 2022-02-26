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
    id: "-1", name: "", description: "", currentTotalValue: { value: 0, minDate: new Date(-1), maxDate: new Date(-1) }, positions: []
};
