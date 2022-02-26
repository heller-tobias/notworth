import { CurrentTotalValue } from "./current-total-value";
import { Position } from "./position";

export interface Portfolio{
    id: string,
    currentTotalValue: CurrentTotalValue,
    name: string,
    description: string,
    positions: Array<Position>
}