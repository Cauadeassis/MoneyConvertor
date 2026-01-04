import { NextResponse } from "next/server";
const token = process.env.AWESOME_API_TOKEN;
interface RawData {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
}

interface RawApiResponse {
    USDBRL: RawData;
    EURBRL: RawData;
    GBPBRL: RawData;
    JPYBRL: RawData;
    ARSBRL: RawData;
    CADBRL: RawData;
    AUDBRL: RawData;
    CHFBRL: RawData;
}

interface ErrorResponse {
    error: string;
    message?: string;
}

export async function GET() {
    try {
        console.log("🔄 Iniciando requisição para AwesomeAPI...");

        const response = await fetch(
            `https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,ARS-BRL,CAD-BRL,AUD-BRL,CHF-BRL?token=${token}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
                next: { revalidate: 60 * 60 * 24 }
            }
        );

        console.log("📊 Status da resposta:", response.status);
        console.log("📋 Headers:", response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Erro na resposta:", errorText);
            throw new Error(`Falha ao buscar cotações: ${response.status}`);
        }

        const rawData: RawApiResponse = await response.json();
        console.log("✅ Dados recebidos com sucesso!");

        const data = {
            USDvalue: rawData.USDBRL.bid,
            EURvalue: rawData.EURBRL.bid,
            GBPvalue: rawData.GBPBRL.bid,
            JPYvalue: rawData.JPYBRL.bid,
            ARSvalue: rawData.ARSBRL.bid,
            CADvalue: rawData.CADBRL.bid,
            AUDvalue: rawData.AUDBRL.bid,
            CHFvalue: rawData.CHFBRL.bid
        };

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
            }
        });

    } catch (error) {
        console.error("❌ Erro capturado:", error);

        const message = error instanceof Error
            ? error.message
            : "Erro desconhecido";

        return NextResponse.json(
            {
                error: "Erro ao fazer conexão",
                message,
            } satisfies ErrorResponse,
            { status: 500 }
        );
    }
}