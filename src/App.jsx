import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Search from "./Pages/Search";
import Details from "./Pages/Details";
import Browse from "./Pages/Browse";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:type/:id" element={<Details />} />
          <Route
            path="/movies"
            element={<Browse key="movies" type="movie" />}
          />
          <Route path="/series" element={<Browse key="tv" type="tv" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
