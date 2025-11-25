import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="page-container">
        <Router />
      </div>
    </BrowserRouter>
  );
}
