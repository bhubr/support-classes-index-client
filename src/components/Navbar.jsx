import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env;

function Navbar({ auth, setAuth }) {
  const onLogout = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/auth/logout`);
      console.log(data);
      setAuth(null);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <ul className="Navbar nav">
      <li className="Navbar__home nav-item">
        <Link to="/">Home</Link>
      </li>
      {
        auth.isTrainer && (
          <li className="nav-item">
            <Link to="/create-session">Create session</Link>
          </li>
        )
      }
      <li className="nav-item">
        <a href="#" onClick={onLogout}>Logout</a>
      </li>
    </ul>
  )
}

export default Navbar;
