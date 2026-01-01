"use client"

import styles from "./index.module.css";

import { useState } from "react";
import rawCurrencies from "./currencies.json" with { type: "json" };

type Currency = Record<string, CurrencyData>;

interface CurrencyData {
    name: string;
    value: string;
    symbol: string;
}

const currencies = rawCurrencies as Currency;

import convert from "./convertLogic.ts"

export default function Page() {
    const [amount, setAmount] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [targetName, setTargetName] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const capitalize = (text: string) =>
        text.charAt(0).toUpperCase() + text.slice(1);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!amount || !targetCurrency) return;

        const { targetName, targetAmount } = convert({
            targetCurrency,
            amount: Number(amount),
        });
        console.log(`${amount} reais foram convertidos para ${targetAmount} ${targetName}!`)
        setResult(targetAmount);
        setTargetName(targetName);
    }

    return (
        <div className={styles.body}>
            <img src="/icons/logo.svg" alt="Convert logo" />

            <main>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">valor em reais</label>
                    <input type="text"
                        name="amount"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder="0" required
                    />

                    <label htmlFor="targetCurrency">moeda</label>
                    <select
                        name="targetCurrency"
                        value={targetCurrency}
                        onChange={(click) => setTargetCurrency(click.target.value)}
                        required
                    >
                        <option value="" disabled hidden>
                            Selecione a moeda
                        </option>

                        {Object.entries(currencies).map(
                            ([currencyCode, currencyData]) => (
                                <option key={currencyCode} value={currencyCode}>
                                    {capitalize(currencyData.name)}
                                </option>
                            )
                        )}
                    </select>

                    <button type="submit">Converter</button>
                </form>
            </main>
            {result !== null && (
                <footer>
                    <span>
                        {amount} {Number(amount) === 1 ? "real equivale" : "reais equivalem"} a
                    </span>
                    <h2>{result.toFixed(2)} {targetName}</h2>
                </footer>
            )}
        </div>
    );
}
