

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";
import { getCryptos } from "../services/cryptoService";
import type { Crypto } from "../types/crypto";

vi.mock("../services/cryptoService", () => ({
  getCryptos: vi.fn(),
}));

describe("Consulta de datos", () => {
  beforeEach(() => {
    vi.mocked(getCryptos).mockReset();
  });

  it("muestra la carga y luego los resultados exitosos", async () => {
    const user = userEvent.setup();

    let resolveRequest!: (cryptos: Crypto[]) => void;

    vi.mocked(getCryptos).mockImplementation(
      () =>
        new Promise<Crypto[]>((resolve) => {
          resolveRequest = resolve;
        })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: /consultar precios/i,
      })
    );

    expect(
      screen.getByText("Cargando precios...")
    ).toBeInTheDocument();

    resolveRequest([
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

    await screen.findByRole("heading", {
      name: /mis criptomonedas favoritas/i,
    });

    await user.click(
      screen.getByRole("button", {
        name: "Buscar",
      })
    );

    expect(
      await screen.findByRole("heading", {
        name: "Bitcoin",
      })
    ).toBeInTheDocument();
  });

  it("muestra un error y permite reintentar la consulta", async () => {
    const user = userEvent.setup();

    vi.mocked(getCryptos)
      .mockRejectedValueOnce(
        new Error("Error al obtener los precios.")
      )
      .mockResolvedValueOnce([
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

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: /consultar precios/i,
      })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent("Error al obtener los precios.");

    await user.click(
      screen.getByRole("button", {
        name: /reintentar/i,
      })
    );

    await screen.findByRole("heading", {
      name: /mis criptomonedas favoritas/i,
    });

    await user.click(
      screen.getByRole("button", {
        name: "Buscar",
      })
    );

    expect(
      await screen.findByRole("heading", {
        name: "Bitcoin",
      })
    ).toBeInTheDocument();
  });
});
