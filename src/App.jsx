import { Route, Routes } from "react-router";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Reviews from "./components/Reviews";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
