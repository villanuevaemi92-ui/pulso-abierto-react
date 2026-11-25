import { useState } from "react";
import type { Crypto } from "../types/crypto";
import { getCryptos } from "../services/cryptoService";
import StatusMessage from "../StatusMessage";
import CryptoControls from "../CryptoControls";
import CryptoList from "../CryptoList";


function Home() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

 async function fetchCryptos() {
  setLoading(true);
  setError("");
  setHasSearched(true);

  try {
    const results = await getCryptos();
    setCryptos(results);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Ocurrió un error inesperado."
    );
    setCryptos([]);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="contenedor">
      <header>
        <h1>Pulso Abierto</h1>
        <p>Consulta los precios de las criptomonedas en tiempo real.</p>
      </header>

      <CryptoControls onSearch={fetchCryptos} loading={loading} />

      <section aria-live="polite" aria-atomic="true">
        {loading && (
          <StatusMessage
            type="loading"
            message="Cargando precios..."
          />
        )}

        {!loading && !hasSearched && (
          <StatusMessage
            type="info"
            message="Presiona el botón para consultar los precios."
          />
        )}

        {!loading && error && (
  <>
    <StatusMessage type="error" message={error} />

    <button onClick={fetchCryptos}>
      Reintentar
    </button>
  </>
)}

        {!loading && !error && cryptos.length > 0 && (
          <CryptoList cryptos={cryptos} />
        )}

        {!loading && !error && hasSearched && cryptos.length === 0 && (
  <StatusMessage
    type="info"
    message="No hay datos disponibles."
  />
)}
      </section>
    </main>
  );
}

export default Home;