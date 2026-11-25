

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import CryptoCard from "./CryptoCard";
import { useFavoritesStore } from "./store/favoritesStore";

describe("Favoritos", () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favorites: [] });
  });

  it("permite agregar una criptomoneda a favoritos", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CryptoCard
          id="bitcoin"
          name="Bitcoin"
          symbol="BTC"
          price={80000}
          selected={false}
          onSelect={() => {}}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", {
      name: /agregar a favoritos/i,
    });

    await user.click(button);

    expect(
      screen.getByRole("button", {
        name: /quitar de favoritos/i,
      })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("permite quitar una criptomoneda de favoritos", async () => {
    const user = userEvent.setup();

    useFavoritesStore.setState({
      favorites: ["bitcoin"],
    });

    render(
      <MemoryRouter>
        <CryptoCard
          id="bitcoin"
          name="Bitcoin"
          symbol="BTC"
          price={80000}
          selected={false}
          onSelect={() => {}}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", {
      name: /quitar de favoritos/i,
    });

    await user.click(button);

    expect(
      screen.getByRole("button", {
        name: /agregar a favoritos/i,
      })
    ).toHaveAttribute("aria-pressed", "false");
  });
});
