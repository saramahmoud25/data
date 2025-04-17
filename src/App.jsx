import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './product';
import Cart from './Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;