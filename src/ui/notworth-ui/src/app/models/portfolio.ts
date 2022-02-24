import { CurrentTotalValue } from "./current-total-value";
import { Position } from "./position";

export interface Portfolio{
    id: number,
    currentValue: CurrentTotalValue,
    name: string,
    description: string,
    positions: Array<Position>
}