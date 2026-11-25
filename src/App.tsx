import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CryptoDetail from "./pages/CryptoDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/criptomonedas/:id"
        element={<CryptoDetail />}
      />

      <Route
        path="*"
        element={<h1>Página no encontrada</h1>}
      />
    </Routes>
  );
}

export default App;