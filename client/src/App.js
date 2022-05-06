import { Footer, Header } from "./components";
import { Routes, Route} from "react-router-dom";
import {Home, ErrorPage, Checkout, Success, Fail} from "./pages"
import {ProductDetail} from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="text-3xl text-center">Hello World</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success/:orderID" element={<Success />} />
        <Route path="/checkout/fail/:orderID" element={<Fail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
