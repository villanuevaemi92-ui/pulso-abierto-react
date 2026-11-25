

import { Link } from "react-router-dom";
import { useFavoritesStore } from "./store/favoritesStore";

interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
}

function CryptoCard({
  id,
  name,
  symbol,
  price,
  selected,
  onSelect
}: CryptoCardProps) {

  // Consultar si esta criptomoneda es favorita
  const isFavorite = useFavoritesStore(
    (state) => state.favorites.includes(id)
  );

  // Obtener la acción para agregar o quitar favoritos
  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  return (
    <article className={selected ? "producto seleccionado" : "producto"}>
      <h2>{name}</h2>
      <p>{symbol}</p>

      <p>
        Precio: ${price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} USD
      </p>

      <Link to={`/criptomonedas/${id}`}>
        Ver detalle
      </Link>

      <button onClick={onSelect}>
        {selected ? "Deseleccionar" : "Seleccionar"}
      </button>

      <button
        onClick={() => toggleFavorite(id)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
      </button>

      {selected && (
        <p role="status">Criptomoneda seleccionada.</p>
      )}
    </article>
  );
}

export default CryptoCard;
