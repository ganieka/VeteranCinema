import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import MoviesList from "./pages/MoviesList";
import Orders from "./pages/Orders";
import OrderTickets from "./pages/OrderTickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route exact path="/movies" element={<MoviesList />} />
      </Routes>
      <Routes>
        <Route exact path="/orders" element={<Orders />} />
      </Routes>
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
      <Routes>
        <Route path="/movie/:id/order-tickets" element={<OrderTickets />} />
      </Routes>
    </Router>
  );
}

export default App;
