
import { useParams, Link } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  description: string;
}

const cryptos: Crypto[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    description: "Bitcoin es una criptomoneda descentralizada.",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    description: "Ethereum es una plataforma de contratos inteligentes.",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    description: "Solana es una blockchain diseñada para transacciones rápidas.",
  },
];

function CryptoDetail() {
  const { id } = useParams();

  // Consultar si esta criptomoneda es favorita
  const isFavorite = useFavoritesStore(
    (state) => state.favorites.includes(id ?? "")
  );

  // Obtener la acción para agregar o quitar favoritos
  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const crypto = cryptos.find(
    (item) => item.id === id
  );

  if (!crypto) {
    return (
      <main className="contenedor">
        <h1>Criptomoneda no encontrada</h1>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main className="contenedor">
      <h1>{crypto.name}</h1>
      <p>Símbolo: {crypto.symbol}</p>
      <p>{crypto.description}</p>

      <button
        onClick={() => toggleFavorite(crypto.id)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
      </button>

      <p>
        {isFavorite
          ? "Esta criptomoneda está en tus favoritos."
          : "Esta criptomoneda no está en tus favoritos."}
      </p>

      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default CryptoDetail;
