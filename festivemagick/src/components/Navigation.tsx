import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/wines" className="hover:text-gray-300">Wines</Link></li>
        {user ? (
          <>
            <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
            {user.isAdmin && <li><Link to="/admin" className="hover:text-gray-300">Admin</Link></li>}
            <li><button onClick={logout} className="hover:text-gray-300">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
            <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;