import { Value } from "./value";

export interface Position{
    id: string,
    name: string,
    description: string,
    category: string,
    values: Array<Value>
}