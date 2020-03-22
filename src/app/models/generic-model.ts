export interface Theme {
    primary: string;
    accent: string;
    displayName: string;
    name: string;
    isDark: boolean;
}

export interface StockData {
    name: string;
    price: number;
    timeStamp?: Date;
    updatedAt?: string | Date;
    className?: string;
    history?: Array<StockHistory>;
    percentageChange?: number;
}

interface StockHistory {
    lastUpdated: string | Date;
    price: number;
}
