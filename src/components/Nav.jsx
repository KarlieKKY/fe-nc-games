import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home </Link>
      <Link to="/categories">Categories </Link>
      <Link to="/reviews">Reviews </Link>
      <Link to="/userprofile">Profile </Link>
    </nav>
  );
};

export default Nav;
