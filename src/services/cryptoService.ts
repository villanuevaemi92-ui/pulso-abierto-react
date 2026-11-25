import type { Crypto } from "../types/crypto";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

interface CryptoApiResponse {
  bitcoin: {
    usd: number;
  };
  ethereum: {
    usd: number;
  };
  solana: {
    usd: number;
  };
}

export async function getCryptos(): Promise<Crypto[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los precios.");
  }

  const data: CryptoApiResponse = await response.json();

  return [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: data.bitcoin.usd,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: data.ethereum.usd,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: data.solana.usd,
    },
  ];
}