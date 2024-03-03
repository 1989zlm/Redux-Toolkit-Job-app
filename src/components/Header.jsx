import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleTheme } from "../redux/slices/counterSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className="d-flex justify-content-between mb-3 p-4">
      <h2>Redux Toolkit</h2>
      <nav className="d-flex gap-5">
        <NavLink to={"/"}>COUNTER</NavLink>
        <NavLink to={"/crud"}>CRUD</NavLink>
        <button onClick={() => dispatch(toggleTheme())}>MODE</button>
      </nav>
    </header>
  );
};

export default Header;
