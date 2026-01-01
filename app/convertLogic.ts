import rawCurrencies from "./currencies.json" with { type: "json" };
const currencies = rawCurrencies as Currency;
type Currency = Record<string, CurrencyData>
interface CurrencyData {
    name: string;
    value: string;
    symbol: string;
}

interface ConvertParameters {
    baseCurrency?: string;
    targetCurrency: string;
    amount: number;
}

export default function convert({
    baseCurrency = "BRL",
    targetCurrency,
    amount,
}: ConvertParameters) {
    const baseCurrencyValue = Number(currencies[baseCurrency].value);
    const targetCurrencyValue = Number(currencies[targetCurrency].value);
    console.log("Convertido no backend!");
    const targetName = currencies[targetCurrency].name;
    const targetAmount = (amount * baseCurrencyValue) / targetCurrencyValue;
    return ({ targetName, targetAmount })
}