class PayloadKey {
    public static readonly VALUES: string = "values";
    public static readonly VALUE: string = "value";
    public static readonly MIN_DATE: string = "minDate";
    public static readonly MAX_DATE: string = "maxDate";
    public static readonly POSITIONS: string = "positions";
    public static readonly CURRENT_VALUE: string = "currentTotalValue";
    public static readonly HISTORIC_VALUE: string = "historicTotalValue";
    public static readonly TOTAL_VALUE: string = "totalValue";
    public static readonly DATE: string = "date";
}


class Url {
    public static readonly VALUES: string = "values";
    public static readonly POSITIONS: string = "positions";
    public static readonly PORTFOLIOS: string = "portfolios";
    public static readonly CATEGORIES: string = "categories";
}

export { PayloadKey, Url }
