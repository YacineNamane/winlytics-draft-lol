import { NavLink } from "react-router-dom";
import WDL from "../assets/WDL.png";
const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <img src={WDL} alt="Winlystics Draft LOL LOGO" />

        <nav>
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
          <NavLink to="/Sim">
            <span>Simulate</span>
          </NavLink>
          <NavLink to="/data">
            <span>Data</span>
          </NavLink>
          <NavLink to="/about">
            <span>About</span>
          </NavLink>
        </nav>
      </div>
      <div className="banner-right">
        <NavLink to="/Contribute" className="donate-btn">
          Contribute
        </NavLink>
      </div>
    </div>
  );
};

export default Banner;
