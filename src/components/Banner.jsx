import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <h1>Winlystic Draft LOL</h1>
        <nav>
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
          <NavLink to="/data">
            <span>Data</span>
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
