import { Currency } from "../data/types"

interface ConvertParameters {
    currencies: Currency;
    baseCurrency?: string;
    targetCurrency: string;
    amount: number;
}

interface ConvertResult {
    targetName: string;
    result: number;
}

export default function convert({
    currencies,
    baseCurrency = "BRL",
    targetCurrency,
    amount,
}: ConvertParameters): ConvertResult {
    if (!currencies[baseCurrency] || !currencies[targetCurrency]) {
        throw new Error("Moeda inválida");
    }
    const baseCurrencyValue = currencies[baseCurrency].value;
    const targetCurrencyValue = currencies[targetCurrency].value;
    const targetName = currencies[targetCurrency].name;
    const result = (amount * baseCurrencyValue) / targetCurrencyValue;
    console.log(`✅ Convertido: ${amount} ${baseCurrency} = ${result.toFixed(2)} ${targetCurrency}`);
    return { targetName, result };
}