
import { useState } from "react";
import { z } from "zod";
import CryptoCard from "./CryptoCard";
import { useFavoritesStore } from "./store/favoritesStore";
import { Link } from "react-router-dom";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

interface CryptoListProps {
  cryptos: Crypto[];
}

type CryptoFilter = "all" | "bitcoin" | "ethereum" | "solana";


const searchSchema = z.object({
  searchTerm: z.string().trim(),

  cryptoFilter: z.enum(
    ["all", "bitcoin", "ethereum", "solana"],
    {
      message: "Seleccioná una criptomoneda válida.",
    }
  ),
})

.superRefine((data, ctx) => {
  if (data.searchTerm.length > 0 && data.searchTerm.length < 3) {
    ctx.addIssue({
      code: "custom",
      path: ["searchTerm"],
      message: "Ingresá al menos 3 caracteres.",
    });
  }
});




function CryptoList({ cryptos }: CryptoListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasAppliedSearch, setHasAppliedSearch] = useState(false);
  const [cryptoFilter, setCryptoFilter] = useState<CryptoFilter>("all");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState<CryptoFilter>("all");

  const [errors, setErrors] = useState<{
    searchTerm?: string;
    cryptoFilter?: string;
  }>({});

  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Obtener los identificadores favoritos
const favoriteIds = useFavoritesStore(
  (state) => state.favorites
);

// Obtener la acción para quitar o agregar favoritos
const toggleFavorite = useFavoritesStore(
  (state) => state.toggleFavorite
);

// Obtener las criptomonedas favoritas
const favoriteCryptos = cryptos.filter((crypto) =>
  favoriteIds.includes(crypto.id)
);

 function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const result = searchSchema.safeParse({
    searchTerm,
    cryptoFilter,
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    setErrors({
      searchTerm: fieldErrors.searchTerm?.[0],
      cryptoFilter: fieldErrors.cryptoFilter?.[0],
    });

    setHasAppliedSearch(false);
    return;
  }

  setErrors({});
  setAppliedSearch(result.data.searchTerm.toLowerCase());
  setAppliedFilter(result.data.cryptoFilter);
  setHasAppliedSearch(true);
}

const filteredCryptos = cryptos.filter((crypto) => {
  const matchesSearch =
    crypto.name.toLowerCase().includes(appliedSearch) ||
    crypto.symbol.toLowerCase().includes(appliedSearch);

  const matchesFilter =
    appliedFilter === "all" || crypto.id === appliedFilter;

  return matchesSearch && matchesFilter;
});

const resultCount = filteredCryptos.length;

  function handleSelect(id: string) {
    setSelectedId((previousId) =>
      previousId === id ? null : id
    );
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="crypto-search">
            Buscar criptomoneda:
          </label>

          <input
            id="crypto-search"
            type="search"
            placeholder="Ejemplo: Bitcoin o BTC"
            value={searchTerm}
           onChange={(event) => {
  setSearchTerm(event.target.value);
  setCryptoFilter("all");
  setErrors({});
}}
            aria-invalid={!!errors.searchTerm}
            aria-describedby={
              errors.searchTerm ? "search-error" : undefined
            }
          />

          {errors.searchTerm && (
            <p id="search-error" role="alert">
              {errors.searchTerm}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="crypto-filter">
            Seleccionar criptomoneda:
          </label>

          <select
            id="crypto-filter"
            value={cryptoFilter}
            onChange={(event) => {
  setCryptoFilter(event.target.value as CryptoFilter);
  setSearchTerm("");
  setErrors({});
}}  
            aria-invalid={!!errors.cryptoFilter}
            aria-describedby={
              errors.cryptoFilter ? "filter-error" : undefined
            }
          >
            <option value="all">Todas</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>

          {errors.cryptoFilter && (
            <p id="filter-error" role="alert">
              {errors.cryptoFilter}
            </p>
          )}
        </div>

        <button type="submit">
          Buscar
        </button>
      </form>

     <section className="favoritos">
  <h2>⭐ Mis criptomonedas favoritas</h2>

  {favoriteCryptos.length === 0 ? (
    <p>Todavía no tenés criptomonedas favoritas.</p>
  ) : (
    <div className="lista-criptomonedas">
      {favoriteCryptos.map((crypto) => (
        <article key={crypto.id} className="producto">
          <h3>{crypto.name}</h3>
          <p>{crypto.symbol}</p>

          <p>
            Precio: ${crypto.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} USD
          </p>

          <Link to={`/criptomonedas/${crypto.id}`}>
            Ver detalle
          </Link>

          <button
            onClick={() => toggleFavorite(crypto.id)}
          >
            Quitar de favoritos
          </button>
        </article>
      ))}
    </div>
  )}
</section>

      {hasAppliedSearch && (
        <>
          <p>Resultados encontrados: {resultCount}</p>

          {resultCount === 0 ? (
            <p role="status">
              No se encontraron criptomonedas.
            </p>
          ) : (
            <div className="lista-criptomonedas">
              {filteredCryptos.map((crypto) => (
                <CryptoCard
  key={crypto.id}
  id={crypto.id}
  name={crypto.name}
  symbol={crypto.symbol}
  price={crypto.price}
  selected={selectedId === crypto.id}
  onSelect={() => handleSelect(crypto.id)}
/>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CryptoList;