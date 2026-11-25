interface CryptoControlsProps {
  onSearch: () => void;
  loading: boolean;
}

function CryptoControls({
  onSearch,
  loading
}: CryptoControlsProps) {
  return (
    <button onClick={onSearch} disabled={loading}>
      {loading ? "Consultando..." : "Consultar precios"}
    </button>
  );
}

export default CryptoControls;