export interface Value{
    id: string,
    date: Date,
    value: number
}

export const DefaultValue = {
    id: "-1", value: 0, date: new Date()
};