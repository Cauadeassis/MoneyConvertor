import { CurrencyData, Currency } from "./types"

export const defaultCurrencies: Currency = {
    BRL: {
        name: "reais",
        value: 1,
        symbol: "R$"
    },
    USD: {
        name: "dólares americanos",
        value: 5.52,
        symbol: "$"
    },
    GBP: {
        name: "libras esterlinas",
        value: 7.42,
        symbol: "£"
    },
    EUR: {
        name: "euros",
        value: 6.47,
        symbol: "€"
    },
    JPY: {
        name: "ienes japoneses",
        value: 0.037,
        symbol: "¥"
    },
    ARS: {
        name: "pesos argentinos",
        value: 0.0058,
        symbol: "$"
    },
    CAD: {
        name: "dólares canadenses",
        value: 4.08,
        symbol: "C$"
    },
    AUD: {
        name: "dólares australianos",
        value: 3.65,
        symbol: "A$"
    },
    CHF: {
        name: "francos suíços",
        value: 6.78,
        symbol: "CHF"
    }
};