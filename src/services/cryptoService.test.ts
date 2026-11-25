
import { describe, it, expect, vi, afterEach } from "vitest";
import { getCryptos } from "./cryptoService";

describe("Servicio de criptomonedas", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("obtiene y transforma correctamente los precios", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        bitcoin: { usd: 80000 },
        ethereum: { usd: 2300 },
        solana: { usd: 100 },
      }),
    });

    vi.stubGlobal("fetch", mockFetch);

    const cryptos = await getCryptos();

    expect(cryptos).toEqual([
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: 80000,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: 2300,
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        price: 100,
      },
    ]);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("detecta un error cuando la respuesta HTTP no es correcta", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    vi.stubGlobal("fetch", mockFetch);

    await expect(getCryptos()).rejects.toThrow(
      "Error al obtener los precios."
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
