export type Currency = Record<string, CurrencyData>;

export interface CurrencyData {
    name: string;
    value: number;
    symbol: string;
}
