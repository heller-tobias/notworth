import { Value } from "./value";

export interface Position{
    id: number,
    name: string,
    description: string,
    category: string,
    values: Array<Value>
}