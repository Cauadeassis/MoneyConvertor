"use client"

import styles from "./index.module.css";

import { useState, useEffect } from "react";
import { defaultCurrencies } from "../backend/data/currencies";
import { Currency, CurrencyData } from "../backend/data/types"

import convert from "../backend/services/convertLogic"

export default function Page() {
    const [currencies, setCurrencies] = useState<Currency>(defaultCurrencies);
    const [amount, setAmount] = useState("");
    const [baseCurrency, setBaseCurrency] = useState("BRL");
    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [targetName, setTargetName] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateData = async () => {
            try {
                const response = await fetch("/api/currencies");
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                const data = await response.json();
                setCurrencies(prev => ({
                    ...prev,
                    USD: { ...prev.USD, value: Number(data.USDvalue) },
                    GBP: { ...prev.GBP, value: Number(data.GBPvalue) },
                    EUR: { ...prev.EUR, value: Number(data.EURvalue) },
                    JPY: { ...prev.JPY, value: Number(data.JPYvalue) },
                    ARS: { ...prev.ARS, value: Number(data.ARSvalue) },
                    CAD: { ...prev.CAD, value: Number(data.CADvalue) },
                    AUD: { ...prev.AUD, value: Number(data.AUDvalue) },
                    CHF: { ...prev.CHF, value: Number(data.CHFvalue) }
                }));
                console.log("✅ Dados atualizados com sucesso");
            } catch (error) {
                console.error("❌ Erro ao buscar cotações:", error);
            } finally {
                setLoading(false);
            }
        };
        updateData();
    }, []);

    const capitalize = (text: string) =>
        text.charAt(0).toUpperCase() + text.slice(1);

    useEffect(() => {
        const { targetName, result } = convert({
            currencies,
            baseCurrency,
            targetCurrency,
            amount: Number(amount),
        });
        console.log(`${amount} reais foram convertidos para ${result} ${targetName}!`)
        setResult(result);
        setTargetName(targetName);
    }, [amount, targetCurrency, currencies, baseCurrency])

    return (
        <div className={styles.body}>
            <img src="/icons/logo.svg" alt="Convert logo" />

            <main>
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

                    {Object.entries(currencies)
                        .filter(([code]) => code !== "BRL")
                        .map(([currencyCode, currencyData]) => (
                            <option key={currencyCode} value={currencyCode}>
                                {capitalize(currencyData.name)} ({currencyData.symbol})
                            </option>
                        ))}
                </select>
            </main>
            {result !== null && (
                <footer>
                    <span>
                        {amount} {Number(amount) === 1 ? "real equivale a" : "reais equivalem a"}
                    </span>
                    <h2>{result.toFixed(2)} {targetName}</h2>
                </footer>
            )}
        </div>
    );
}
