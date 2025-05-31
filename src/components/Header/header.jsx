import './header.css';
import { Link ,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate=useNavigate()
  const onClickLogOut=()=>{
    Cookies.remove('jwt_token')
    navigate("/login")
  }
  return (
    <header className="header">
      <div className="header-left">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </div>

      <nav className="header-nav header-nav-text">
        <Link to="/" className="header-link">Home</Link>
        <Link to="/jobs" className="header-link">Jobs</Link>
      </nav>

      <button className="header-logout-btn header-logout-text" onClick={onClickLogOut}>Logout</button>

      <nav className="header-nav header-nav-icons">
        <Link to="/" className="header-icon" title="Home" aria-label="Home">
          <span className="material-icons" role="img">home</span>
        </Link>
        <Link to="/jobs" className="header-icon" title="Jobs" aria-label="Jobs">
          <span className="material-icons" role="img">work</span>
        </Link>
        <Link to="/login" className="header-icon" title="Logout" aria-label="Logout">
          <span className="material-icons" role="img" onClick={onClickLogOut}>logout</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
